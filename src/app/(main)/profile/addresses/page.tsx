import AddressPage from "@/features/profile/addresses/AddressPage";
import UserGuestAuthGuard from "@/hoc/UserGuestAuthGuard";

function address() {
    return <AddressPage/>
}

export default UserGuestAuthGuard(address)