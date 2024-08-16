import React,{useState, useRef} from 'react';
// import {useNavigate} from 'react-router-dom';

const signUser = async (user) => {
    const response = await fetch('https://bitem-server.vercel.app/user/create', {
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

export default function CreateUser({setMessages, messages, setLoad}) {

    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const formRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoad(200);
        if(fullname !== "" && fullname !== " " && fullname[0] !== " " && fullname[fullname.length-1] !== " " && email !== "" && email !== " " && email[0] !== " " && email[email.length-1] !== " " && password !== "" && password !== " " && password[0] !== " " && password[password.length-1] !== " "){
            const user = {
                fullname: fullname,
                email: email,
                password: password,
            }
            const data = await signUser(user);
            formRef.current.reset();
            setLoad(100);
            setMessages([...messages, data.message]);
            setFullname("");
            setEmail("");
            setPassword("");
        } else {
            formRef.current.reset();
            setLoad(100);
        }
    }

    return (
        <div className="w-full md:w-1/3 h-full flex flex-col justify-center gap-3 text-sm p-10">
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
        </div>
    );
}
