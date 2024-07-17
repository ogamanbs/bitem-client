import React,{useState, useRef, useEffect} from 'react';
// import {useNavigate} from 'react-router-dom';

const signUser = async (user) => {
    const response = await fetch('http://localhost:8000/user/create', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    });
    if(!response.ok){
        const data = await response.json();
        return data;
    } else {
        const data = await response.json();
        if(data){
            return data;
        } else {
            return {message: "error fetching response data"};
        }
    }
}

export default function CreateUser() {

    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState("");

    const formRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(fullname !== "" && fullname !== " " && fullname[0] !== " " && fullname[fullname.length-1] !== " " && email !== "" && email !== " " && email[0] !== " " && email[email.length-1] !== " " && password !== "" && password !== " " && password[0] !== " " && password[password.length-1] !== " "){
            const user = {
                fullname: fullname,
                email: email,
                password: password,
            }

            const data = await signUser(user);
            setResponse(data.message);
            setFullname("");
            setEmail("");
            setPassword("");
            formRef.current.reset();
        } else {
            console.log('space');
            formRef.current.reset();
        }
    }

    useEffect(() => {
        if (response) {
            const timer = setTimeout(() => {
                setResponse('');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [response]);

    return (
        <div className="w-full md:w-1/3 h-full flex flex-col justify-center gap-3 text-sm p-5">
            <div className=''>
                <h1 className="hidden md:block text-2xl font-bold">welcome to <span className="text-blue-400">Bitem</span></h1>
                <h1 className="text-xl font-medium">Create your account</h1>
            </div>
            <form ref={formRef} onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center gap-2">
                <input
                    type="text"
                    name="fullname"
                    placeholder="fullname"
                    autoComplete="off"
                    onChange={(e) => setFullname(e.target.value)}
                    className="w-full border border-zinc-700 rounded-full py-2 px-5 outline-none bg-transparent"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-zinc-700 rounded-full py-2 px-5 outline-none bg-transparent"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    autoComplete="off"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-zinc-700 rounded-full py-2 px-5 outline-none bg-transparent"
                />
                <div className="mt-3">
                    <input
                        type="submit"
                        value="create my account"
                        className="w-full rounded-full py-2 px-5 outline-none bg-blue-500 text-white capitalize cursor-pointer"
                    />
                </div>
            </form>
            {response === 'successfully created user' ? (
                <div className="text-sm text-green-700 text-center">{response}</div>
                ):(
                <div className="text-sm text-red-500 text-center">{response}</div>
            )}
        </div>
    );
}
