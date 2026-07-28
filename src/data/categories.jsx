import {
    ShoppingCart, PartyPopper, Home, Car, Heart,
    ShoppingBag, Sunglasses, Coins, Sparkles,
} from "pixelarticons/react";

export const CATEGORIES = [
    { value: "MERCADO",          label: "Mercado",          type: "GASTO",   Icon: ShoppingCart, color: "#FF6FA5" },
    { value: "SALIDAS",          label: "Salidas",          type: "GASTO",   Icon: PartyPopper,  color: "#8B5CF6" },
    { value: "HOGAR",            label: "Hogar",            type: "GASTO",   Icon: Home,         color: "#FFC24C" },
    { value: "TRANSPORTE",       label: "Transporte",       type: "GASTO",   Icon: Car,          color: "#4ADE80" },
    { value: "CUIDADO_PERSONAL", label: "Cuidado Personal", type: "GASTO",   Icon: Heart,        color: "#FF9FC4" },
    { value: "SHOPPING",         label: "Shopping",         type: "GASTO",   Icon: ShoppingBag,  color: "#C9A8FF" },
    { value: "OTRO",             label: "Otro",             type: "GASTO",   Icon: Sunglasses,   color: "#7E6B99" },
    { value: "NOMINA",           label: "Nómina",           type: "INGRESO", Icon: Coins,        color: "#4ADE80" },
    { value: "EXTRAS",           label: "Extras",           type: "INGRESO", Icon: Sparkles,     color: "#FFC24C" },
];

export const categoriesByType = (type) => CATEGORIES.filter((c) => c.type === type);