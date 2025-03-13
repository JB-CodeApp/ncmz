"use client";
import React, { useRef, useState } from "react";

export default function FaqFullPage({ data }) {
    const questionRefs = useRef([]);
    const answerRefs = useRef([]);
    const [openIndex, setOpenIndex] = useState(null);


    const toggleAccordions = (i) => {
        setOpenIndex(openIndex === i ? null : i);

        if (questionRefs.current[i].classList.contains("active")) {
            questionRefs.current[i].classList.remove("active");
            const element = answerRefs.current[i];
            element.style.height = "0px";
            element.style.overflow = "hidden";
            element.style.transition = "all 0.5s ease-in-out";
            element.style.marginBottom = "0px";
        } else {
            questionRefs.current[i].classList.add("active");

            const element = answerRefs.current[i];
            element.style.height = element.scrollHeight + "px";
            element.style.overflow = "hidden";
            element.style.transition = "all 0.5s ease-in-out";
            element.style.marginBottom = "1.55em";
        }
    };

    return (
        <>
            <h2 className="text-2xl font-semibold pb-7">Frequently Asked Questions</h2>
            <dl className="toggle">
                <hr className="border-1 border-black" />

                {data?.map((item, index) => (
                    <React.Fragment key={index}>
                        <dt
                            onClick={() => {
                                toggleAccordions(index);
                            }}
                            className="cursor-pointer text-md font-semibold flex items-center space-x-2 pt-2"
                        >
                            <h3 ref={(el) => (questionRefs.current[index] = el)}>{item.question}</h3>
                            <span
                                className={`transform transition-transform duration-300 absolute right-0  ${openIndex === index ? 'rotate-180' : ''}`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        </dt>
                        <dd
                            ref={(el) => (answerRefs.current[index] = el)}
                            className="black faqAnswer pt-2"
                            style={{
                                height: "0px",
                                overflow: "hidden",
                                marginBottom: "0px",
                                transition: "all 0.5s ease-in-out",
                            }}
                        >
                            {item.answer}
                        </dd>
                        <hr className="border-1 border-black" />
                    </React.Fragment>
                ))}
            </dl>
        </>
    );
}
