
import { getAuthToken } from "@/app/actions/auth.actions";
import Content from "./content";
import { decodeJWT, getNameFromPayload } from "@repo/api-client/jwt";


export async function Header() {
    const token = await getAuthToken();
    const name = getNameFromPayload(decodeJWT(token ?? ""));
    console.log("Header - name:", name);
    
    return <Content initialUser={name} />;
}