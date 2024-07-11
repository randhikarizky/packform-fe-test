import Cookies from "universal-cookie";

const wafer = new Cookies();

export default function usePermission() {
  const can = () => {
    const token = wafer.get("token");

    return token !== undefined;
  };

  return { can };
}
