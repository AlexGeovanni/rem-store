"use client";
import Link from "next/link";
import ButtonBase from "@workspace/ui/components/buttonBase";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/app/hooks/useCart";
// import ButtonAnimateBorder from "../buttons/button-animate-border";


interface UserActionsProps {
  onClickLogin: () => void;
  onClickProfile: () => void;
  userName?: string | null;
}

export default function UserActions({ onClickLogin, onClickProfile, userName }: UserActionsProps) {
 const {items} = useCart()
 const totalCartQuantity = items.reduce(
  (total, item) => total + item.quantity,
  0
);

const cartBadge =
  totalCartQuantity > 9 ? "9+" : totalCartQuantity;

  return (
    <div className="flex items-center gap-4">
      <Link href={"/carrito"} className="relative">
        <ShoppingCart />
        <span className="absolute text-[10px] bg-destructive z-10 -top-2 left-3 text-white rounded-full w-5 h-5 flex items-center justify-center">
       {cartBadge}
      </span>
      </Link>
      {!!userName ? (
        <UserAvatar user={userName} onClickProfile={onClickProfile} />
      ) : (
        <ButtonBase onClick={onClickLogin} className="text-sm h-11">
          Iniciar sesión
        </ButtonBase>
      )}
    </div>
  );
}

interface UserAvatarProps {
  user: string;
  onClickProfile: () => void;
}

const UserAvatar = ({ user, onClickProfile }: UserAvatarProps) => {
  const userName = user?.split(' ')[0] || 'Usuario';
  const initialName = user?.split(' ')[0]?.charAt(0) || 'U';
  return (
    <div onClick={onClickProfile} className="flex items-center gap-2 border border-gray-300 rounded-full pl-4 cursor-pointer">
        <div>
            <span className="text-sm font-medium">Hola, </span>
            <span className="text-sm font-medium capitalize">{userName}</span>
        </div>
        <div className="text-base font-medium h-10 w-10 bg-amber-600 rounded-full flex items-center justify-center">
          <span className="text-white">{initialName}</span>
        </div>
      </div>
  );
}
