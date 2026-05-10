import Link from "next/link";

type PropsForm = "sign-up" | "sign-in";

type Props={
    type: PropsForm;
 
}

export default function FooterForm({type}:Props){
    return(
        <div className="body-2 my-1.5 text-sm xsm:text-base flex justify-center md:justify-center ">
        <p className="text-light-100">
          {type === "sign-in"
            ? "¿Aun no tienes una cuenta?"
            : "¿Ya tienes una cuenta?"}
        </p>
        <Link
          href={type === "sign-in" ? "/auth/registro" : "/auth/iniciar-sesion"}
          className="ml-1 font-medium text-[#3A3AAF] underline "
        >
          {type === "sign-in" ? "Registrate" : "Iniciar sesión"}
        </Link>
      </div>
    )
} 