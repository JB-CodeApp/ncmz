"use client";

// import "./styles.css";
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

export default function CalHomeButton() {
    useEffect(() => {
        (async function () {
            const cal = await getCalApi();
            cal("floatingButton", {
                calLink: "bhumikaios/30min",
                "buttonText": "",
            });
            cal("ui", {
                styles: {
                    branding: { brandColor: "#000000" }
                }
            });
        })();
    }, []);

    return <div className="App"></div>;
}
