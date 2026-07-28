/**
 * FALLAS.TS - BASE DE DATOS DE FALLAS Y SOLUCIONES
 * ===============================================
 *
 * Este archivo contiene TODAS las fallas y sus soluciones.
 * Es el corazon del sistema de diagnostico.
 *
 * COMO ESTA ORGANIZADO:
 * --------------------
 * 1. Interfaces (tipos de datos)
 * 2. Array de fallas (fallasData)
 * 3. Funciones de busqueda
 *
 * COMO AGREGAR UNA NUEVA FALLA:
 * -----------------------------
 * 1. Ve al array fallasData
 * 2. Copia una falla existente como plantilla
 * 3. Cambia el id, nombre y soluciones
 * 4. Guarda el archivo
 *
 * EJEMPLO DE UNA FALLA:
 * --------------------
 * {
 *   id: 'no-enciende',           // Identificador unico
 *   nombre: 'No enciende',        // Texto que ve el usuario
 *   soluciones: [                // Lista de soluciones posibles
 *     {
 *       titulo: 'Revisar bateria',
 *       descripcion: 'Medir bateria para saber si funciona.'
 *     }
 *   ]
 * }
 */

// ============================================
// INTERFACES (TIPOS DE DATOS)
// ============================================



/**
 * INTERFACE: Falla
 * ================
 *
 * Define como se ve UNA falla en el sistema.
 *
 * id: Identificador unico (usado internamente, no visible)
 * nombre: Lo que ve el usuario en la lista
 * soluciones: Array de posibles soluciones para esa falla
 */
export interface Falla {
  id: string;           // Ej: 'no-enciende'
  nombre: string;       // Ej: 'No enciende'
  descripcion: string; //descripcion de falla
  url: string; // Lista de soluciones
  color?: 'primary' | 'blue' | 'white' | 'purple' | 'green'
 }

// ============================================
// DATOS DE FALLAS
// ============================================

/**
 * fallasData: Array con TODAS las fallas
 * ======================================
 *
 * Este es el array principal con todas las fallas del sistema.
 * CADA FALLA tiene:
 * - ID unico (sin espacios, minusculas, con guiones)
 * - Nombre descriptivo (lo que ve el usuario)
 * - Array de soluciones (puede ser 1 o varias)
 *
 * COMO AGREGAR UNA FALLA NUEVA:
 * -----------------------------
 * Copia este formato y agregalo al final del array:
 *
 * {
 *   id: 'id-de-tu-falla',       // Sin espacios, minusculas
 *   nombre: 'Nombre de la falla', // Texto visible
 *   soluciones: [
 *     {
 *       titulo: 'Titulo de solucion',
 *       descripcion: 'Descripcion detallada...'
 *     }
 *   ]
 * },
 */
export const fallasData: Falla[] = [
  {
    id: 'codigo1',
    nombre: 'Encontrar dispositivos iOS',
    descripcion: 'Página de rastreo de Apple',
    url: 'https://www.icloud.com/find',
    color: 'primary',
  },

  {
    id: 'codigo2',
    nombre: 'Encontrar Dispositivos Android',
    descripcion: 'Pagina de rastreo de Google ',
    url: 'https://myaccount.google.com/find-your-phone',
    color: 'primary',
  },
  {
    id: 'codigo3',
    nombre: 'Lista de Proveedores',
    descripcion: 'Acceso a nuestra lista de proveedores ',
    url: 'https://rentry.co/proveedorescurso',
    color: 'green',
  },
  {
    id: 'codigo4',
    nombre: 'GSM ARENA - Encontrar un Modelo Técnico y Telefono',
    descripcion: 'Encontrá cualquier dispositivo buscando en esta base de datos',
    url: 'https://www.gsmarena.com/',
    color: 'green',
  },
  {
    id: 'codigo5',
    nombre: 'Busqueda - Google Lens',
    descripcion: 'Accedé a Google Lens',
    url: 'https://lens.google/intl/es-419/#cta-section',
    color: 'purple',
  },
  {
    id: 'codigo6',
    nombre: 'Dolar Hoy',
    descripcion: 'Seguí el precio del dolar Actualizado',
    url: 'https://dolarhoy.com/',
    color: 'purple',
  },
  {
    id: 'codigo7',
    nombre: 'Enacom - Consultar IMEI ARG',
    descripcion: 'Buscá un IMEI y consultá su estado',
    url: 'https://imei.enacom.gob.ar/',
    color: 'purple',
  },
  {
    id: 'codigo8',
    nombre: 'Drive - Curso Reparación de celulares',
    descripcion: 'Ingresá a la carpeta digital del Curso',
    url: 'https://drive.google.com/drive/u/0/folders/1FGlBaXEkI0Oxy4j6FAWtg4aaE9j980UI',
    color: 'purple',
  },
  {
    id: 'codigo9',
    nombre: 'Movical - Consultar IMEI ARG',
    descripcion: 'Página alternativa para consultas de imei',
    url: 'https://www.movical.net/ar-es/chequear-imei',
    color: 'white',
  },
  {
    id: 'codigo10',
    nombre: 'GSM Prime - Cuenta de google',
    descripcion: 'Canal de youtube Especializado en Cuenta de google Manual',
    url: 'https://www.youtube.com/@GSMPrimeNext',
    color: 'white',
  },
  {
    id: 'codigo11',
    nombre: 'IMEI Info - Consultar Modelo de equipo con IMEI',
    descripcion: 'Buscá informacion del telefono solo con numero IMEI',
    url: 'https://www.imei.info/',
    color: 'white',
  },
  {
    id: 'codigo12',
    nombre: 'Esquematicos.org - Buscar Diagramas',
    descripcion: 'Buscá algunos diagramas esquematicos',
    url: 'https://esquematicos.org/',
    color: 'blue',
  },
  {
    id: 'codigo13',
    nombre: 'Check Imei - Consultar Imei',
    descripcion: 'Alternativa para consultar IMEI',
    url: 'https://imeicheck.com/es/verificador-imei',
    color: 'blue',
  },
  {
    id: 'codigo14',
    nombre: 'SamFW - Firmware de Celulares',
    descripcion: 'Accedé a una base de datos de firmware de celulares',
    url: 'https://samfw.com/',
    color: 'blue',
  },
];
;

// ============================================
// FUNCIONES DE BUSQUEDA
// ============================================

/**
 * getFallaNames: Obtiene todos los nombres de fallas
 * ===================================================
 *
 * Retorna un array con solo los nombres, usado en el buscador
 * para mostrar sugerencias mientras el usuario escribe.
 *
 * @returns Array de strings con los nombres
 */
export const getFallaNames = (): string[] => {
  // .map() extrae solo el campo 'nombre' de cada falla
  return fallasData.map((f) => f.nombre);
};

/**
 * getFallaById: Busca una falla por su ID
 * ======================================
 *
 * @param id - El ID de la falla a buscar
 * @returns La falla encontrada o undefined si no existe
 */
export const getFallaById = (id: string): Falla | undefined => {
  // .find() retorna el primer elemento que cumple la condicion
  return fallasData.find((f) => f.id === id);
};

/**
 * getFallaByName: Busca una falla por su nombre
 * =============================================
 *
 * @param nombre - El nombre de la falla a buscar (case insensitive)
 * @returns La falla encontrada o undefined si no existe
 */
export const getFallaByName = (nombre: string): Falla | undefined => {
  // Convertimos ambos a minusculas para buscar sin importar mayusculas
  return fallasData.find(
    (f) => f.nombre.toLowerCase() === nombre.toLowerCase()
  );
};

/**
 * searchFallas: Busca fallas que coincidan con un termino
 * =======================================================
 *
 * Busca en el nombre de la falla Y en sus soluciones.
 *
 * @param query - Termino de busqueda
 * @returns Array de fallas que coinciden
 */
export const searchFallas = (query: string): Falla[] => {
  // Convertimos a minusculas para buscar sin importar mayusculas
  const lowerQuery = query.toLowerCase();


};
