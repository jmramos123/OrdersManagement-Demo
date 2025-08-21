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
  IonSpinner,
} from "@ionic/react";
import { db } from "../firebaseConfig";
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";

type FirestoreOrder = {
  id: string;
  userId: string;
  items: any; // can be Array or Map from Firestore
  status: string;
  date?: any; // Firestore Timestamp or undefined
};

const Tab3: React.FC = () => {
  const [orders, setOrders] = useState<FirestoreOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const q = query(
      collection(db, "Orders"),
      where("userId", "==", "qwerty123"), // Replace with auth uid later
      orderBy("date", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list: FirestoreOrder[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as any),
        }));
        setOrders(list);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const renderDate = (date: any) => {
    if (!date) return "—";
    const d =
      typeof date.toDate === "function"
        ? date.toDate()
        : date.seconds
        ? new Date(date.seconds * 1000)
        : new Date(date);
    return d.toLocaleString();
  };

  const renderItems = (items: any) => {
    if (!items) return "No items";
    if (Array.isArray(items)) {
      return items.map((i) => `${i.name} x ${i.quantity}`).join(", ");
    }
    if (typeof items === "object") {
      return Object.values(items)
        .map((i: any) => `${i.name} x ${i.quantity}`)
        .join(", ");
    }
    return "Invalid items format";
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Orders</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {loading ? (
          <div
            className="ion-padding"
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <IonSpinner />
            <IonText>Loading orders…</IonText>
          </div>
        ) : orders.length === 0 ? (
          <IonText className="ion-padding">
            <p>No orders yet.</p>
          </IonText>
        ) : (
          <IonList>
            {orders.map((order) => (
              <IonItem key={order.id}>
                <IonLabel>
                  <h2 style={{ marginBottom: 4 }}>Status: {order.status}</h2>
                  <p style={{ margin: 0 }}>Date: {renderDate(order.date)}</p>
                  <p style={{ margin: "6px 0 0" }}>{renderItems(order.items)}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
