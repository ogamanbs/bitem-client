import { RiEye2Line, RiEyeCloseLine } from '@remixicon/react';
import React,{useState, useRef} from 'react';

const signUser = async (user) => {
    const response = await fetch('https://server.bitem.in/user/create', {
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
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState("");
    const [show, setShow] = useState(false);

    const formRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoad(200);
        if(image !== "" && name !== "" && name !== " " && name[0] !== " " && name[name.length-1] !== " " && email !== "" && email !== " " && email[0] !== " " && email[email.length-1] !== " " && password !== "" && password !== " " && password[0] !== " " && password[password.length-1] !== " "){
            const user = {
                name: name,
                image: image,
                email: email,
                password: password,
            }
            const data = await signUser(user);
            formRef.current.reset();
            setLoad(100);
            setMessages([...messages, data.message]);
            setName("");
            setEmail("");
            setPassword("");
        } else {
            formRef.current.reset();
            setMessages([...messages, "empty fields not allowed"]);
            setLoad(100);
        }
    }

    const handleClick = () => {
        setShow(!show);
    }

    const handleImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const img = reader.result.toString('base64');
            setImage(img);
        }
        reader.readAsDataURL(file);
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
                    name="name"
                    placeholder="name"
                    autoComplete="off"
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-zinc-700 rounded-full py-2 px-5 outline-none bg-transparent"
                />
                <input
                    type="file"
                    name="name"
                    onChange={handleImage}
                    className="w-full rounded-full file:rounded-full file:bg-amber-300 file:mr-5 file:border-0 file:py-2 file:px-5 outline-none bg-transparent"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-zinc-700 rounded-full py-2 px-5 outline-none bg-transparent"
                />
                <div className="w-full flex items-center gap-2 border border-zinc-700 rounded-full">
                    <input
                        type={show ? 'text' : 'password'}
                        name="password"
                        placeholder="password"
                        autoComplete="off"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-full px-5 py-2 outline-none bg-transparent"
                    />
                    <div onClick={handleClick} className="py-2 px-3 cursor-pointer">
                        { show ? <RiEye2Line size={20} /> : <RiEyeCloseLine size={20} /> }
                    </div>
                </div>
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
