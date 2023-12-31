import dynamic from 'next/dynamic';

const Chat = dynamic(() => import('./Chat'), {
    ssr: false,
})

export default function Ably() {

    return (
        <>
            <h1 className="title">Next.js Chat Demo</h1>
            <Chat />
        </>
    )
}