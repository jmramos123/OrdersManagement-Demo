import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonButton,
  IonSpinner,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useCart } from "./CartContext";

const Tab1: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { addToCart } = useCart();

  useEffect(() => {
    // Subscribe to Firestore changes
    const unsubscribe = onSnapshot(
      collection(db, "Products"),
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(items);
        setLoading(false);
      },
      (error) => {
        console.error("Firestore error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const doRefresh = async (event: CustomEvent) => {
    // With onSnapshot we don’t really need manual refresh,
    // but we’ll just close the refresher quickly.
    (event.target as HTMLIonRefresherElement).complete();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Products</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        {loading ? (
          <div
            className="ion-padding"
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <IonSpinner />
            <IonText>Loading products…</IonText>
          </div>
        ) : products.length === 0 ? (
          <IonText className="ion-padding">
            <p>No products found.</p>
          </IonText>
        ) : (
          <IonList>
            {products.map((product) => (
              <IonItem key={product.id} lines="full">
                <IonLabel>
                  <IonText>
                    <h2 style={{ marginBottom: 4 }}>{product.name}</h2>
                  </IonText>
                  <IonText color="medium">
                    <p style={{ margin: 0 }}>{product.description}</p>
                  </IonText>
                  <IonText>
                    <p style={{ margin: "6px 0 0" }}>💲 {product.price}</p>
                  </IonText>
                  <IonText>
                    <p style={{ margin: 0 }}>Stock: {product.stock}</p>
                  </IonText>
                </IonLabel>
                <IonButton
                  slot="end"
                  onClick={() =>
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                    })
                  }
                  disabled={product.stock <= 0} // prevent adding if no stock
                >
                  {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                </IonButton>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
