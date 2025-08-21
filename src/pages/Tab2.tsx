import React, { useMemo, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonText,
  IonFooter,
} from "@ionic/react";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  runTransaction,
} from "firebase/firestore";
import { useCart } from "./CartContext";

const Tab2: React.FC = () => {
  const { cart, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const placeOrder = async () => {
    if (cart.length === 0 || submitting) return;

    try {
      setSubmitting(true);

      // 1️⃣ Create the order
      await addDoc(collection(db, "Orders"), {
        userId: "qwerty123", // Replace with Firebase Auth uid when you add auth
        items: cart.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        status: "pending",
        date: serverTimestamp(),
      });

      // 2️⃣ Reduce stock atomically in a transaction
      await runTransaction(db, async (transaction) => {
        for (const item of cart) {
          const productRef = doc(db, "Products", item.id);
          const productSnap = await transaction.get(productRef);

          if (!productSnap.exists()) {
            throw new Error(`Product ${item.name} not found!`);
          }

          const currentStock = productSnap.data().stock ?? 0;
          if (currentStock < item.quantity) {
            throw new Error(
              `Not enough stock for ${item.name}. Available: ${currentStock}`
            );
          }

          transaction.update(productRef, {
            stock: currentStock - item.quantity,
          });
        }
      });

      clearCart();
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Check console for details.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cart</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {cart.length === 0 ? (
          <IonText className="ion-padding">
            <p>Your cart is empty.</p>
          </IonText>
        ) : (
          <>
            <IonList>
              {cart.map((item) => (
                <IonItem key={item.id}>
                  <IonLabel>
                    <h2 style={{ marginBottom: 4 }}>{item.name}</h2>
                    <p style={{ margin: 0 }}>
                      Qty: {item.quantity} • Unit: ${item.price} • Subtotal: $
                      {item.price * item.quantity}
                    </p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
            <div className="ion-padding">
              <IonText>
                <h2 style={{ marginTop: 0 }}>Total: ${total}</h2>
              </IonText>
              <IonButton
                expand="block"
                onClick={placeOrder}
                disabled={submitting}
              >
                {submitting ? "Placing Order…" : "Place Order"}
              </IonButton>
              <IonButton
                expand="block"
                fill="clear"
                onClick={clearCart}
                disabled={submitting}
              >
                Clear Cart
              </IonButton>
            </div>
          </>
        )}
      </IonContent>
      <IonFooter />
    </IonPage>
  );
};

export default Tab2;
