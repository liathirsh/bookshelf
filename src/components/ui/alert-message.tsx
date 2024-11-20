// "use client";

// import { useEffect, useState } from "react";
// import { Alert, AlertTitle } from "@/components/ui/alert";
// import { AlertCircle } from "lucide-react";

// interface alertMessage {
//     type: "destructive"
//     title: string;
// }

// export function AlertMessage() {
//     const [alert, setAlert] = useState<alertMessage | null>(null);

//     useEffect(() => {
//         const storedAlert= localStorage.getItem("alertMessage");
//         if (storedAlert) {
//             setAlert(JSON.parse(storedAlert));
//             localStorage.removeItem("alertMesage")
//         }
//     }, []);

//     useEffect(() => {
//         if (alert) {
//             const timer = setTimeout(() => {
//                 setAlert(null);
//             }, 5000);
//             return () => clearTimeout(timer);
//         }
//     }, [alert])

//     if (!alert) return null;

//     return (
//         <Alert variant={alert.type}>
//             <AlertCircle className="h-4 w-4" />
//             <AlertTitle>{alert.title}</AlertTitle>
//         </Alert>
//     );
// };