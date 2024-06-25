import React, { useState, useEffect } from "react";
import { FaCopy } from "react-icons/fa";
import { useLazyGetSummaryQuery } from "../Services/article";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  loader, } from "../assets";

const Right = () => {
    const [article, setArticle] = useState({
        url: "",
        summary: "",
    });
    const [copied, setCopied] = useState(false); // State to track if URL is copied

    const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

    useEffect(() => {
        const articlesFromLocalStorage = JSON.parse(localStorage.getItem("articles"));
        if (articlesFromLocalStorage) {
            setArticle(articlesFromLocalStorage[0]);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data } = await getSummary({ articleUrl: article.url });
        if (data?.summary) {
            const newArticle = { ...article, summary: data.summary };
            setArticle(newArticle);
            localStorage.setItem("articles", JSON.stringify([newArticle]));
        }
    };

    const handleCopy = (copyText) => {
        navigator.clipboard.writeText(copyText);
        setCopied(true);
        toast.success('Copied to clipboard!', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <section className="p-4 md:mt-24">
            <div className="shadow-md rounded-lg p-4 flex flex-col items-center bg-gray-900">
                <form className="relative flex items-center justify-center w-full" onSubmit={handleSubmit}>
                    <img src="https://static.thenounproject.com/png/1247211-200.png" alt="link-icon" className="absolute left-0 my-2 ml-3 w-5" />
                    <input
                        type="url"
                        placeholder="Paste the article link"
                        value={article.url}
                        onChange={(e) => setArticle({ ...article, url: e.target.value })}
                        required
                        className="rounded-md px-4 py-2 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none text-xl"
                    >
                        <p>↵</p>
                    </button>
                </form>
            </div>

            <div className="my-10 max-w-full flex justify-center items-center">
                {isFetching ? (
                    <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
                ) : error ? (
                    <p className="font-inter font-bold text-black text-center">
                        Well, that wasn't supposed to happen...
                        <br />
                        <span className="font-satoshi font-normal text-gray-700">
                            {error?.data?.error}
                        </span>
                    </p>
                ) : (
                    article.summary && (
                        <div className="flex flex-col gap-4 p-6 items-left rounded-lg max-w-2xl mx-auto bg-gray-900 shadow-md relative">
                            <h2 className="font-satoshi font-bold text-white text-2xl">
                                Article <span className="blue_gradient">Summary</span>
                            </h2>
                            <div className="summary_box bg-gray-100 p-4 rounded-md">
                                <p className="font-inter font-medium text-base text-gray-700 leading-relaxed mb-8">
                                    {article.summary}
                                </p>
                                <button
                                    onClick={() => handleCopy(article.summary)}
                                    className="absolute bottom-1 right-4 bg-blue-500 text-white px-3 py-1 rounded-md focus:outline-none flex items-center space-x-1"
                                >
                                    <FaCopy />
                                    <span>Copy</span>
                                </button>
                            </div>
                        </div>
                    )
                )}
            </div>
            <ToastContainer />
        </section>
    );
};

export default Right;
