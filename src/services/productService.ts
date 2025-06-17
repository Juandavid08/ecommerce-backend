import fetch from 'node-fetch';

export const fetchProductsFromVTEX = async (): Promise<any[]> => {
  const response = await fetch("https://offcorss.myvtex.com/api/catalog_system/pub/products/search/");
  if (!response.ok) {
    throw new Error("Error al obtener productos de VTEX");
  }
  return await response.json() as any[];
};
