"use client";
import {useRouter} from "next/navigation";

export default function Banner  () {

    const router=useRouter();

    return (
        <div className="flex flex-col items-center mt-6">
            <button className="" onClick={() => router.push("/catalogo")}>
                <div className="ml-10 ">
                    <img src="/Banner.jpg" alt="" width={800} height={800} className="" />
                </div>
            </button>
        </div>
    )
}