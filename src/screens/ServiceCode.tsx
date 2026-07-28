import React, { useState, useCallback, useMemo } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { SearchBar } from '../components/SearchBar';
import { Header, Footer, HomeButton } from '../components/Layout';

interface SearchScreenProps {
  onBack: () => void;
}

interface ServiceItem {
  id: number;
  nombre: string;
  descripcion: string;
  variant?: 'default' | 'elevated' | 'bordered' | 'glow' | 'iluminado' ;
}

const serviceCodes: ServiceItem[] = [
  {
    id: 1,
    nombre: "Codigo: *#06#",
    descripcion: "Muestra el IMEI Del equipo",
    variant: "iluminado"
  },
  {
    id: 2,
    nombre: "Código: *#1234#",
    descripcion: "Ver Versión de firmware (desactivado en algunos modelos)"
  },
  {
    id: 3,
    nombre: "Service Code ZTE: *983*0#",
    descripcion: "Codigo de servicio para algunos ZTE"
  },
  {
    id: 4,
    nombre: "Service Code Lenovo: *#*#4636*#",
    descripcion: "Codigo de servicio para algunos LENOVO"
  },
  {
    id: 5,
    nombre: "Service Code OnePlus: *#*#2346579#*#*",
    descripcion: "Codigo de servicio para algunos ONEPLUS"
  },
  {
    id: 6,
    nombre: "Service Code Honor: *#*#2345#*#* ",
    descripcion: "Codigo de servicio para algunos HONOR"
  },
  {
    id: 7,
    nombre: "Service Code Motorola: *#*#2486#*#*",
    descripcion: "Codigo de servicio para algunos MOTOROLA"
  },
  {
    id: 8,
    nombre: "Service Code Samsung: *#0*# ",
    descripcion: "Codigo de servicio para algunos SAMSUNG"
  },
  {
    id: 9,
    nombre: "Service Code Samsung: *#*#88#*#* ",
    descripcion: "Codigo Alternativo de servicio para algunos SAMSUNG"
  },
  {
    id: 10,
    nombre: "Service Code Xiaomi: *#*#6484#*#* ",
    descripcion: "Codigo de servicio para algunos XIAOMI"
  },
  {
    id: 11,
    nombre: "Service Code Xiaomi: *#*#64663#*#*  ",
    descripcion: "Codigo Alternativo de servicio para algunos XIAOMI REDMI"
  },
  {
    id: 12,
    nombre: "Service Code Alcatel:  *#2886#",
    descripcion: "Codigo de servicio para algunos ALCATEL"
  },
  {
    id: 13,
    nombre: "Service Code Oppo: *#899#",
    descripcion: "Codigo de servicio para algunos OPPO"
  },
  {
    id: 14,
    nombre: "Service Code Huawei: *#*#2846579#*#*",
    descripcion: "Codigo de servicio para algunos HUAWEI"
  },
  {
    id: 15,
    nombre: "Service Code Sony: *#*#7378423#*#*",
    descripcion: "Codigo de servicio para algunos SONY"
  },
  {
    id: 16,
    nombre: "Service Code Vivo: *#*#225#*#*",
    descripcion: "Codigo de servicio para algunos VIVO"
  },
  {
    id: 17,
    nombre: "Service Code HTC: *#*#3424#*#*",
    descripcion: "Codigo de servicio para algunos HTC"
  },
  {
    id: 18,
    nombre: "Field Test Mode Iphone: *3001#12345#*",
    descripcion: "Codigo de servicio para algunos IPHONE"
  },
   {
    id: 19,
    nombre: "Service Code Tecno: *#*#4636#*#*",
    descripcion: "Codigo de servicio para algunos TECNO"
  },
  {
    id: 20,
    nombre: "Service Code Infinix: *#*#64663#*#*",
    descripcion: "Codigo de servicio para algunos INFINIX"
  },
  {
    id: 21,
    nombre: "USSD Samsung : *#12580*369#",
    descripcion: "Muestra información del hardware y software de dispositivos SAMSUNG"
  },
  {
    id: 22,
    nombre: "USSD Samsung: *#0011#",
    descripcion: "Muestra Información de servicio y red en dispositivos SAMSUNG"
  },
  {
    id: 23,
    nombre: "USSD Samsung: *#0011#",
    descripcion: "Abre el menú SysDump en dispositivos SAMSUNG"
  },
  {
    id: 24,
    nombre: "USSD Verificar Desvios de llamada: *#21#",
    descripcion: "Verifica el estado de los desvíos de llamada"
  },
  {
    id: 25,
    nombre: "USSD Desvio de llamada: **21*[número]#",
    descripcion: "Activa el desvío de llamada INCONDICIONAL"
  },
  {
    id: 26,
    nombre: "USSD Desvio de llamada: **67*[número]#",
    descripcion: "Activa el desvío de llamada si está OCUPADO"
  },
  {
    id: 27,
    nombre: "USSD Desvio de llamada: **61*[número]#",
    descripcion: "Activa el desvío de llamada si NO RESPONDE"
  },
  {
    id: 28,
    nombre: "USSD Desvio de llamada: **62*[número]#",
    descripcion: "Activa el desvío de llamada si no disponible (sin señal o celular apagado)"
  },
  {
    id: 29,
    nombre: "USSD Desvio de llamada: ##002#",
    descripcion: "Cancela todos los desvíos de llamada"
  },
  {
    id: 30,
    nombre: "USSD Desvio de llamada: ##21#",
    descripcion: "Desactiva el desvío de llamada INCONDICIONAL"
  },
  {
    id: 31,
    nombre: "USSD Desvio de llamada: ##67#",
    descripcion: "Desactiva el desvío de llamada si está OCUPADO"
  },
  {
    id: 32,
    nombre: "USSD Desvio de llamada: ##61#",
    descripcion: "Desactiva el desvío de llamada si NO RESPONDE"
  },
  {
    id: 33,
    nombre: "USSD Desvio de llamada: ##62#",
    descripcion: "Desactiva el desvío de llamada si NO DISPONIBLE (sin señal o apagado)"
  },
  {
    id: 34,
    nombre: "USSD Activar Linea Claro: *234#",
    descripcion: "Activar Chip CLARO Argentina"
  },
  {
    id: 35,
    nombre: "USSD Activar Linea Movistar: *611#",
    descripcion: "Activar Chip MOVISTAR Argentina"
  },
  {
    id: 36,
    nombre: "USSD Activar Linea Personal: *234#",
    descripcion: "Activar Chip PERSONAL Argentina"
  },
  {
    id: 37,
    nombre: "USSD Activar llamada en espera: *#21#",
    descripcion: "Activa el servicio para Voz"
  },
  {
    id: 38,
    nombre: "USSD Desactivar llamada en espera: #21#",
    descripcion: "Desactiva el servicio para Voz"
  },
  {
    id: 39,
    nombre: "MMI Codigo Certificaciones legales: *#07#",
    descripcion: "Muestra disposiciones legales, Radiacion y Taza de absorción en algunos dispositivos"
  },
  
];


export const ServiceCode: React.FC<SearchScreenProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const serviceNames = useMemo(
    () => serviceCodes.map((item) => item.nombre),
    []
  );

  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return serviceCodes;

    const query = searchQuery.toLowerCase();

    return serviceCodes.filter(
      (item) =>
        item.nombre.toLowerCase().includes(query) ||
        item.descripcion.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleGoHome = useCallback(() => {
    setSearchQuery('');
    onBack();
  }, [onBack]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header showLogout={false} />

      <main className="flex-1 pt-24 pb-8 px-4">
        <div className="max-w-md mx-auto w-full space-y-4">

          {/* Back button */}
          <Button
            variant="ghost"
            onClick={onBack}
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            }
            className="animate-fadeIn"
          >
            Volver
          </Button>

          {/* Search bar */}
          <div className="animate-fadeInUp stagger-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Buscar marca..."
              suggestions={serviceNames}
              autoFocus
              fullWidth
            />
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between text-sm animate-fadeInUp stagger-2">
            <span className="text-[var(--text-muted)]">
              {filteredServices.length} resultado{filteredServices.length !== 1 ? 's' : ''} encontrado{filteredServices.length !== 1 ? 's' : ''}
            </span>

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[var(--color-primary)] hover:underline"
              >
                Limpiar búsqueda
              </button>
            )}
          </div>

          {filteredServices.map((service) => (
            <Card
              key={service.id}
              variant="default"
              hoverable
            >
              <h3 className="text-lg font-bold">
                {service.nombre}
              </h3>

              <p className="text-sm opacity-80 mt-2">
                {service.descripcion}
              </p>
            </Card>
          ))}

        </div>
      </main>

      <HomeButton onClick={handleGoHome} />
      <Footer />
    </div>
  );
};