"use client";
import {useRouter} from "next/navigation";

export default function Banner  () {

    const router=useRouter();

    return (
        <div className="flex flex-col items-center">
            <button className="" onClick={() => router.push("/catalogo")}>
                <div className="">
                    <img src="/Banner.jpg" alt="" width={1200} height={600} className="rounded-lg" />
                </div>
            </button>
        </div>
    )
}