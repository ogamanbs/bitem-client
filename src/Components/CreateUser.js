import { RiEye2Line, RiEyeCloseLine } from '@remixicon/react';
import React,{useState, useRef} from 'react';

const signUser = async (user) => {
    // const response = await fetch('https://server.bitem.in/user/create', {
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
            console.log(user);
            const data = await signUser(user);
            formRef.current.reset();
            setLoad(100);
            setMessages([...messages, data.message]);
            setName("");
            setEmail("");
            setImage("");
            setPassword("");
        } else {
            setMessages([...messages, "empty fields not allowed"]);
            setLoad(100);
        }
    }

    const handleClick = () => {
        setShow(!show);
    }

    const handleImage = (e) => {
        const file = e.target.files[0];
        try {
            if(file instanceof Blob) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const img = reader.result;
                    setImage(img);
                };
                reader.readAsDataURL(file);
            } else {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const img = reader.result.toString('base64');
                    setImage(img);
                }
            }
        } catch(err) {
            console.error("readAsFileURL error is being generated again and again" + err);
        }
    }

    return (
        <div className="w-full md:w-1/3 h-full flex flex-col justify-center gap-3 text-sm p-10">
            <div className=''>
                <h1 className="hidden md:block text-2xl font-bold">welcome to <span className="text-blue-400">Bitem</span></h1>
                <h1 className="text-xl font-medium">Create your account</h1>
            </div>
            <form ref={formRef} onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-2">
                <div className="w-full h-32 ml-10">
                    {image === "" ? (
                        <div className="relative h-32 w-32 rounded-[10px] border border-dashed border-zinc-400 bg-zinc-100 overflow-hidden cursor-pointer">
                            <div className="absolute h-32 w-32 flex flex-col items-center justify-center text-xs p-1">
                                <h1 className="text-center">Drag and Drop an image here</h1>
                                <h1 className="text-center">or</h1>
                                <h1 className="text-center">Click to select your profile image</h1>
                            </div>
                            <input
                                type="file"
                                name="image"
                                onChange={handleImage}
                                className="absolute opacity-0 h-32 w-32 display-none rounded-lg outline-none bg-transparent cursor-pointer"
                            />
                        </div>
                        ) : (
                        <div className="relative h-32 w-32 rounded-[10px] overflow-hidden cursor-pointer">
                            <div className="absolute h-32 w-32 rounded-[10px] bg-zinc-100 overflow-hidden">
                                <img className="w-full h-full object-cover" src={image} alt={name} />
                            </div>
                            <input
                                type="file"
                                name="image"
                                onChange={handleImage}
                                className="absolute opacity-0 h-32 w-32 display-none rounded-lg outline-none bg-transparent cursor-pointer"
                            />
                        </div>
                    )}
                </div>
                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    autoComplete="off"
                    onChange={(e) => setName(e.target.value)}
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
