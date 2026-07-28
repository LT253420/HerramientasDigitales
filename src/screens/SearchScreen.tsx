import React, { useState, useCallback, useMemo } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { SearchBar } from '../components/SearchBar';
import { Header, Footer, HomeButton } from '../components/Layout';
import { fallasData, getFallaNames, type Falla } from '../data/fallas.ts';
import { cn } from '../utils/helpers.ts';

interface SearchScreenProps {
  onBack: () => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({ onBack, }) => {
  const [searchQuery, setSearchQuery] = useState('');




  const fallaNames = useMemo(() => getFallaNames(), []);

  const filteredFallas = useMemo(() => {
    if (!searchQuery.trim()) return fallasData;
    const query = searchQuery.toLowerCase();
    return fallasData.filter((f) =>
      f.nombre.toLowerCase().includes(query) ||
      f.descripcion.toLowerCase().includes(query)
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
              placeholder="Buscar Página..."
              suggestions={fallaNames}
              autoFocus
              fullWidth
            />
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between text-sm animate-fadeInUp stagger-2">
            <span className="text-[var(--text-muted)]">
              {filteredFallas.length} falla{filteredFallas.length !== 1 ? 's' : ''} encontrada{filteredFallas.length !== 1 ? 's' : ''}
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[var(--color-primary)] hover:underline"
              >
                Limpiar busqueda
              </button>
            )}
          </div>

          {filteredFallas.map((falla,) => (
          <Card
           key={falla.id}
           variant="default"
            color={falla.color}
            hoverable
            clickable
            onClick={() => window.open(falla.url, "_blank")}
            >
            <h3 className="text-lg font-bold]">
              {falla.nombre}
            </h3>

            <p className="text-sm opacity-80 mt-2">
              {falla.descripcion}
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