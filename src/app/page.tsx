"use client";

import { useState } from "react";
import { Sparkles, ShoppingBag, Camera, Upload, Heart, Share2, CreditCard, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Screen = "home" | "product" | "upload" | "result" | "credits";

interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  store: string;
  storeUrl: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Jaqueta Tech Premium",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop",
    price: "R$ 299,90",
    store: "Fashion Store",
    storeUrl: "#"
  },
  {
    id: 2,
    name: "Camiseta Oversized",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop",
    price: "R$ 89,90",
    store: "Urban Style",
    storeUrl: "#"
  },
  {
    id: 3,
    name: "Vestido Elegante",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
    price: "R$ 249,90",
    store: "Elegance Shop",
    storeUrl: "#"
  },
  {
    id: 4,
    name: "Calça Cargo Premium",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=800&fit=crop",
    price: "R$ 179,90",
    store: "Street Wear",
    storeUrl: "#"
  }
];

export default function NewLook() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [fusedResult, setFusedResult] = useState<string | null>(null);
  const [credits, setCredits] = useState(10);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen("product");
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserPhoto(reader.result as string);
        generateFusion();
      };
      reader.readAsDataURL(file);
    }
  };

  const generateFusion = () => {
    if (credits <= 0) {
      alert("⚠️ Você não tem Flech suficiente! Adquira mais créditos.");
      setCurrentScreen("credits");
      return;
    }

    setTimeout(() => {
      setFusedResult(selectedProduct?.image || null);
      setCredits(prev => prev - 1);
      setCurrentScreen("result");
    }, 1500);
  };

  const handleBuyCredits = (amount: number) => {
    setCredits(prev => prev + amount);
    alert(`✅ ${amount} Flech adicionados com sucesso!`);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Header */}
      <header className="border-b border-[#00FF7F]/20 backdrop-blur-sm bg-[#0D0D0D]/95 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setCurrentScreen("home")}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00FF7F] to-[#00CC66] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-black" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-[#00FF7F] to-white bg-clip-text text-transparent">
                  New Look
                </span>
              </h1>
            </button>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentScreen("credits")}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A1A] border border-[#00FF7F]/30 hover:border-[#00FF7F] transition-all duration-300"
              >
                <Zap className="w-4 h-4 text-[#00FF7F]" />
                <span className="text-sm font-semibold">{credits} Flech</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tela Inicial */}
      {currentScreen === "home" && (
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                Experimente Roupas
                <br />
                <span className="bg-gradient-to-r from-[#00FF7F] to-[#00CC66] bg-clip-text text-transparent">
                  Virtualmente
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Veja como as roupas ficam em você antes de comprar. Tecnologia de IA para o seu estilo perfeito.
              </p>
            </div>

            <Button
              onClick={() => setCurrentScreen("product")}
              size="lg"
              className="bg-gradient-to-r from-[#00FF7F] to-[#00CC66] hover:opacity-90 text-black font-bold text-lg px-8 py-6 rounded-2xl shadow-2xl shadow-[#00FF7F]/20 transition-all duration-300 hover:scale-105"
            >
              <ShoppingBag className="w-6 h-6 mr-2" />
              Acessar Web
            </Button>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <Card className="bg-[#1A1A1A] border-[#00FF7F]/20 p-6 hover:border-[#00FF7F] transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#00FF7F]/10 flex items-center justify-center mb-4">
                  <Camera className="w-6 h-6 text-[#00FF7F]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Tire sua Foto</h3>
                <p className="text-sm text-gray-400">
                  Envie uma foto ou escolha da galeria
                </p>
              </Card>

              <Card className="bg-[#1A1A1A] border-[#00FF7F]/20 p-6 hover:border-[#00FF7F] transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#00FF7F]/10 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-[#00FF7F]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">IA Avançada</h3>
                <p className="text-sm text-gray-400">
                  Fusão realista com tecnologia de ponta
                </p>
              </Card>

              <Card className="bg-[#1A1A1A] border-[#00FF7F]/20 p-6 hover:border-[#00FF7F] transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#00FF7F]/10 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-6 h-6 text-[#00FF7F]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Compre Direto</h3>
                <p className="text-sm text-gray-400">
                  Link direto para a loja do produto
                </p>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Tela de Produtos */}
      {currentScreen === "product" && (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Marketplace</h2>
              <p className="text-gray-400">Escolha uma peça para experimentar</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockProducts.map((product) => (
                <Card
                  key={product.id}
                  className="bg-[#1A1A1A] border-[#00FF7F]/20 overflow-hidden group hover:border-[#00FF7F] transition-all duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => handleProductSelect(product)}
                >
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
                    <p className="text-[#00FF7F] font-bold text-lg">{product.price}</p>
                    <p className="text-xs text-gray-400">{product.store}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tela de Upload */}
      {currentScreen === "upload" && selectedProduct && (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Produto Selecionado */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Produto Selecionado</h2>
                <Card className="bg-[#1A1A1A] border-[#00FF7F]/20 overflow-hidden">
                  <div className="aspect-[3/4]">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{selectedProduct.name}</h3>
                    <p className="text-[#00FF7F] font-bold text-xl">{selectedProduct.price}</p>
                  </div>
                </Card>
              </div>

              {/* Upload de Foto */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Sua Foto</h2>
                <Card className="bg-[#1A1A1A] border-[#00FF7F]/20 p-8">
                  <div className="aspect-[3/4] bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-2xl flex items-center justify-center border-2 border-dashed border-[#00FF7F]/30">
                    {userPhoto ? (
                      <img
                        src={userPhoto}
                        alt="Sua foto"
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    ) : (
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 mx-auto rounded-full bg-[#00FF7F]/10 flex items-center justify-center">
                          <Upload className="w-10 h-10 text-[#00FF7F]" />
                        </div>
                        <p className="text-gray-400">Envie sua foto</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 space-y-3">
                    <label>
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-[#00FF7F] to-[#00CC66] hover:opacity-90 text-black font-semibold"
                      >
                        <span className="cursor-pointer">
                          <Camera className="w-5 h-5 mr-2" />
                          Minha Pose
                        </span>
                      </Button>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>

                    {userPhoto && (
                      <Button
                        onClick={generateFusion}
                        className="w-full bg-[#00FF7F] hover:bg-[#00FF7F]/80 text-black font-semibold"
                      >
                        <Sparkles className="w-5 h-5 mr-2" />
                        Gerar Look (1 Flech)
                      </Button>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tela de Resultado */}
      {currentScreen === "result" && fusedResult && selectedProduct && (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Seu Novo Look!</h2>
              <p className="text-gray-400">Veja como ficou incrível</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Resultado da Fusão */}
              <Card className="bg-[#1A1A1A] border-[#00FF7F]/20 overflow-hidden">
                <div className="aspect-[3/4] relative">
                  {userPhoto && (
                    <img
                      src={userPhoto}
                      alt="Base"
                      className="w-full h-full object-cover opacity-30"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={fusedResult}
                      alt="Resultado"
                      className="w-4/5 h-4/5 object-contain drop-shadow-2xl"
                    />
                  </div>
                  <div className="absolute top-4 left-4 bg-[#00FF7F] text-black px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    IA Aplicada
                  </div>
                </div>
              </Card>

              {/* Ações */}
              <div className="space-y-4">
                <Card className="bg-[#1A1A1A] border-[#00FF7F]/20 p-6">
                  <h3 className="text-xl font-semibold mb-4">Produto</h3>
                  <div className="flex gap-4 mb-6">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="font-semibold mb-1">{selectedProduct.name}</h4>
                      <p className="text-[#00FF7F] font-bold text-xl mb-1">{selectedProduct.price}</p>
                      <p className="text-sm text-gray-400">{selectedProduct.store}</p>
                    </div>
                  </div>

                  <Button
                    onClick={() => window.open(selectedProduct.storeUrl, '_blank')}
                    className="w-full bg-gradient-to-r from-[#00FF7F] to-[#00CC66] hover:opacity-90 text-black font-bold text-lg py-6 rounded-xl shadow-lg shadow-[#00FF7F]/20"
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Quero Esse Look
                  </Button>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="border-[#00FF7F]/40 hover:bg-[#00FF7F]/10 hover:border-[#00FF7F]"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Favoritar
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#00FF7F]/40 hover:bg-[#00FF7F]/10 hover:border-[#00FF7F]"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Compartilhar
                  </Button>
                </div>

                <Button
                  onClick={() => setCurrentScreen("product")}
                  variant="outline"
                  className="w-full border-[#00FF7F]/40 hover:bg-[#00FF7F]/10 hover:border-[#00FF7F]"
                >
                  Experimentar Outra Peça
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tela de Créditos */}
      {currentScreen === "credits" && (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Adquirir Flech</h2>
              <p className="text-xl text-gray-400">Créditos para experimentar mais looks</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { amount: 10, price: "R$ 9,90", popular: false },
                { amount: 50, price: "R$ 39,90", popular: true },
                { amount: 100, price: "R$ 69,90", popular: false }
              ].map((pack) => (
                <Card
                  key={pack.amount}
                  className={`bg-[#1A1A1A] border-[#00FF7F]/20 p-6 relative ${
                    pack.popular ? 'border-[#00FF7F] scale-105' : ''
                  }`}
                >
                  {pack.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00FF7F] text-black px-4 py-1 rounded-full text-xs font-bold">
                      POPULAR
                    </div>
                  )}
                  
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#00FF7F] to-[#00CC66] flex items-center justify-center">
                      <Zap className="w-8 h-8 text-black" />
                    </div>
                    
                    <div>
                      <p className="text-4xl font-bold text-[#00FF7F]">{pack.amount}</p>
                      <p className="text-sm text-gray-400">Flech</p>
                    </div>
                    
                    <p className="text-2xl font-bold">{pack.price}</p>
                    
                    <div className="space-y-2">
                      <Button
                        onClick={() => handleBuyCredits(pack.amount)}
                        className="w-full bg-gradient-to-r from-[#00FF7F] to-[#00CC66] hover:opacity-90 text-black font-semibold"
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Cartão
                      </Button>
                      <Button
                        onClick={() => handleBuyCredits(pack.amount)}
                        variant="outline"
                        className="w-full border-[#00FF7F]/40 hover:bg-[#00FF7F]/10"
                      >
                        Pix
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button
                onClick={() => setCurrentScreen("home")}
                variant="ghost"
                className="text-gray-400 hover:text-white"
              >
                Voltar ao Início
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[#00FF7F]/20 mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p className="mb-2">New Look - Provador Virtual Premium</p>
          <p>Experimente roupas com tecnologia de IA antes de comprar</p>
        </div>
      </footer>
    </div>
  );
}
