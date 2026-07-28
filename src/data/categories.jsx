import {
    ShoppingCart, PartyPopper, Home, Car, Heart,
    ShoppingBag, Sunglasses, Coins, Sparkles,
} from "pixelarticons/react";

export const CATEGORIES = [
    { value: "MERCADO",          label: "Mercado",          type: "GASTO",   Icon: ShoppingCart, color: "#FF6FA5", desc: "Comida y básicos del súper: víveres, aseo, despensa." },
    { value: "SALIDAS",          label: "Salidas",          type: "GASTO",   Icon: PartyPopper,  color: "#8B5CF6", desc: "Ocio y planes: restaurantes, bares, cine, fiestas." },
    { value: "HOGAR",            label: "Hogar",            type: "GASTO",   Icon: Home,         color: "#FFC24C", desc: "Gastos de la casa: arriendo, servicios, internet, muebles." },
    { value: "TRANSPORTE",       label: "Transporte",       type: "GASTO",   Icon: Car,          color: "#4ADE80", desc: "Moverte: gasolina, transporte público, taxis, apps." },
    { value: "CUIDADO_PERSONAL", label: "Cuidado Personal", type: "GASTO",   Icon: Heart,        color: "#FF9FC4", desc: "Tu bienestar: peluquería, gym, salud, cosméticos." },
    { value: "SHOPPING",         label: "Shopping",         type: "GASTO",   Icon: ShoppingBag,  color: "#C9A8FF", desc: "Compras personales: ropa, tecnología, antojos." },
    { value: "OTRO",             label: "Otro",             type: "GASTO",   Icon: Sunglasses,   color: "#7E6B99", desc: "Cualquier gasto que no encaje en las demás." },
    { value: "NOMINA",           label: "Nómina",           type: "INGRESO", Icon: Coins,        color: "#4ADE80", desc: "Tu sueldo o pagos fijos por tu trabajo." },
    { value: "EXTRAS",           label: "Extras",           type: "INGRESO", Icon: Sparkles,     color: "#FFC24C", desc: "Ingresos puntuales: regalos, ventas, freelance, bonos." },
];

export const categoriesByType = (type) => CATEGORIES.filter((c) => c.type === type);