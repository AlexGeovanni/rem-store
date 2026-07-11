import Wrapper from "@/app/components/ui/wrapper";
import { useUserStore } from "@/app/stores/useUserStore";
export default function HeaderAccount() {
  
  const { user } = useUserStore();
  const initialName = user?.name?.split(' ')[0]?.charAt(0) || 'U';
  const formatDateCreatAt = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });
  }
  return (
    <section className="border-b py-4 ">
      <Wrapper className=" py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
          <div className="text-xl font-medium h-15 w-15 bg-amber-600 rounded-full flex items-center justify-center">
          <span className="text-white">{initialName}</span>
        </div>
            <div className="">
              <p className="font-medium">{user?.name}</p>
              <div>
                <div className="text-xs  text-gray-500">
                  Cliente desde {user ? formatDateCreatAt(user?.createdAt) : "--"}
                </div>
                <div className="text-xs  text-gray-500">
                  - pedidos realizados
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
}