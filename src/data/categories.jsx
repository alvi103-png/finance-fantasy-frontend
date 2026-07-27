import {
    ShoppingCart, PartyPopper, Home, Car, Heart,
    ShoppingBag, Sunglasses, Coins, Sparkles,
} from "pixelarticons/react";

export const CATEGORIES = [
    { value: "MERCADO",          label: "Mercado",          type: "GASTO",   Icon: ShoppingCart },
    { value: "SALIDAS",          label: "Salidas",          type: "GASTO",   Icon: PartyPopper },
    { value: "HOGAR",            label: "Hogar",            type: "GASTO",   Icon: Home },
    { value: "TRANSPORTE",       label: "Transporte",       type: "GASTO",   Icon: Car },
    { value: "CUIDADO_PERSONAL", label: "Cuidado Personal", type: "GASTO",   Icon: Heart },
    { value: "SHOPPING",         label: "Shopping",         type: "GASTO",   Icon: ShoppingBag },
    { value: "OTRO",             label: "Otro",             type: "GASTO",   Icon: Sunglasses },
    { value: "NOMINA",           label: "Nómina",           type: "INGRESO", Icon: Coins },
    { value: "EXTRAS",           label: "Extras",           type: "INGRESO", Icon: Sparkles },
];

export const categoriesByType = (type) => CATEGORIES.filter((c) => c.type === type);