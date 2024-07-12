import { useCallback, useEffect, useRef, useState } from "react";
import { MdCheck } from "react-icons/md";

const App = () => {
    const [length, setLength] = useState(8);
    const [numberChecked, setNumberChecked] = useState(false);
    const [charChecked, setCharChecked] = useState(false);
    const [password, setPassword] = useState("");
	const [copied, setCopied] = useState(false);

    const passRef = useRef(null);

    const passwordGenerator = useCallback(() => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        if (numberChecked) str += "0123456789";
        if (charChecked) str += "!@#$%^&*()_+=-{}[]|;':\",.<>/?";

        for (let i = 1; i <= length; i++) {
            let idx = Math.floor(Math.random() * str.length + 1);
            pass += str.charAt(idx);
        }

        setPassword(pass);
    }, [length, numberChecked, charChecked, setPassword]);

    useEffect(() => {
		setCopied(false);
        passwordGenerator();
    }, [length, numberChecked, charChecked, passwordGenerator]);

	const copyPasswordToClipboard = useCallback(() => {
		passRef.current?.select();
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
			passRef.current?.setSelectionRange(0, 0);
		}, 3000);
		window.navigator.clipboard.writeText(password);
	}, [password]);

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-400 bg-zinc-800">
                    <h1 className="text-white my-5 text-center text-2xl">
                        Password Generator
                    </h1>
                    <div className="flex shad rounded-lg overflow-hidden mb-4">
                        <input
                            type="text"
                            value={password}
                            ref={passRef}
                            className="outline-none w-full py-1 px-3 text-xl font-semibold text-zinc-700 shadow-2xl"
                            placeholder="password"
                            readOnly
                        />
                        <button
                            onClick={copyPasswordToClipboard}
                            className="outline-none shrink-0 bg-zinc-500 rounded-r-lg px-2 py-2 text-xl text-white font-semibold"
                        >
                            {copied ? "Copied" : "Copy"}
                        </button>
                        {copied && (
                            <div className="bg-green-700 text-xl text-center px-2 flex items-center rounded-lg ml-1 text-white">
                                <MdCheck />
                            </div>
                        )}
                    </div>
                    <div className="flex gap-x-4 text-md justify-center">
                        <div className="flex items-center gap-x-1">
                            <input
                                id="length"
                                type="range"
                                min={5}
                                max={100}
                                value={length}
                                onChange={(e) => setLength(e.target.value)}
                                className="cursor-pointer"
                            />
                            <label htmlFor="length">Length: {length}</label>
                        </div>
                        <div className="flex items-center gap-x-1">
                            <input
                                id="numberInput"
                                type="checkbox"
                                defaultChecked={numberChecked}
                                onChange={() => {
                                    setNumberChecked((prev) => !prev);
                                }}
                            />
                            <label htmlFor="numberInput">Number</label>
                        </div>
                        <div className="flex items-center gap-x-1">
                            <input
                                id="charInput"
                                type="checkbox"
                                defaultChecked={charChecked}
                                onChange={() => {
                                    setCharChecked((prev) => !prev);
                                }}
                            />
                            <label htmlFor="charInput">Character</label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
