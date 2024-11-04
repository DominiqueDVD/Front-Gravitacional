import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Herramientas = () => {
    const [activeTab, setActiveTab] = useState<string>('herramienta1');
    const navigate = useNavigate();

    const renderContent = () => {
        switch (activeTab) {
            case 'herramienta1':
                return <div>
                    <div className='card p-3 mb-3'>
                        <h3>Zonas Vulnerables (USD/HA):</h3>
                        <p>
                            <strong>Descripción del Servicio:</strong> Este servicio identifica y mapea áreas que presentan un alto riesgo de inundación o erosión, permitiendo a los usuarios planificar intervenciones adecuadas para mitigar estos riesgos. Al proporcionar un análisis detallado de la topografía y las condiciones del terreno, se facilita la toma de decisiones informadas sobre la gestión del paisaje.
                        </p>
                        <ul>
                            <li>
                                <strong>Áreas propensas a inundaciones o erosión (Superficie):</strong> Identificación de zonas específicas que son más susceptibles a eventos climáticos extremos, basándose en factores como la pendiente y la capacidad de retención de agua del suelo.
                            </li>
                        </ul>
                    </div>
                    <div className='card p-3 mb-3'>
                        <h3>Cálculo de Flujo (USD/HA):</h3>
                        <p>
                            <strong>Descripción del Servicio:</strong> Este servicio permite calcular el flujo de agua en un terreno específico, considerando factores como la precipitación y las características del suelo. Proporciona información valiosa para el diseño de drenajes eficientes que minimicen el riesgo de inundaciones y optimicen el manejo del agua.
                        </p>
                        <ul>
                            <li>
                                <strong>Corrientes de agua (Línea):</strong> Representación gráfica de cómo el agua se mueve a través del terreno, identificando rutas naturales de drenaje.
                            </li>
                            <li>
                                <strong>Dirección del flujo hídrico (Línea):</strong> Determina la trayectoria del agua, ayudando a comprender cómo se distribuye y concentra en el paisaje.
                            </li>
                        </ul>
                    </div>
                </div>;
            case 'herramienta2':
                return <div>
                    <div className='card p-3 mb-3'>
                        <h3>Diseño Hidrológico (USD/HA):</h3>
                        <p>
                            <strong>Descripción del Servicio:</strong> Este servicio se encarga de diseñar un sistema de gestión del agua que optimice su flujo desde las zonas más bajas hasta las más altas del terreno. El diseño hidrológico es fundamental para garantizar un control hídrico efectivo y sostenible en el paisaje.
                        </p>
                        <ul>
                            <li>
                                <strong>Líneas de valles (Línea):</strong> Identificación de los caminos naturales del agua en las zonas más bajas, facilitando el diseño de estructuras que aprovechen estos flujos.
                            </li>
                            <li>
                                <strong>Líneas de parteaguas (Línea):</strong> Delimitan áreas donde el agua se divide para fluir en direcciones opuestas, siendo crucial para el manejo de cuencas.
                            </li>
                            <li>
                                <strong>Líneas del patrón de diseño hidrológico (Línea):</strong> Estas líneas representan el flujo controlado de agua a través de zanjas de desviación, contribuyendo a la homogenización de la humedad en el suelo.
                            </li>
                        </ul>
                    </div>
                    <div className='card p-3 mb-3'>
                        <h3>Plantaciones con Retención Hídrica (USD/HA):</h3>
                        <p>
                            <strong>Descripción del Servicio:</strong> Este servicio determina la disposición óptima de las plantas en un terreno con el fin de maximizar la retención de agua y prevenir la erosión. Al considerar la vegetación como un elemento clave en el manejo del agua, se fomenta la sostenibilidad del paisaje.
                        </p>
                        <ul>
                            <li>
                                <strong>Puntos que representan las plantas (diámetro de 1m) (Punto):</strong> Indica la ubicación de las plantas estratégicamente seleccionadas para mejorar la retención de agua.
                            </li>
                            <li>
                                <strong>Distanciamiento entre puntos de plantación (Línea):</strong> Espacio calculado entre cada planta para maximizar la eficacia en la retención de humedad.
                            </li>
                            <li>
                                <strong>Distanciamiento entre líneas de plantas (Línea):</strong> Espacio diseñado entre hileras de plantas, optimizando la cobertura del suelo.
                            </li>
                        </ul>
                    </div>
                </div>;
            case 'herramienta3':
                return <div>
                    <div className='card p-3 mb-3'>
                        <h3>Trazado de Drenajes (USD/ML):</h3>
                        <p>
                            <strong>Descripción del Servicio:</strong> Este servicio se encarga de diseñar zanjas de drenaje que dirigen el agua de manera controlada, previniendo inundaciones en áreas vulnerables. A través de un diseño cuidadoso, se garantiza la eficiencia en el manejo del agua.
                        </p>
                        <ul>
                            <li>
                                <strong>Zanjas de drenaje (Línea):</strong> Canales diseñados para captar el agua antes de que alcance áreas propensas a inundaciones.
                            </li>
                            <li>
                                <strong>Líneas de inflexión (Línea):</strong> Delimitan las transiciones entre áreas cóncavas y convexas, informando sobre la topografía del terreno.
                            </li>
                            <li>
                                <strong>Puntos de intersección (Punto):</strong> Localización de puntos críticos donde los flujos de agua interactúan con los límites del terreno.
                            </li>
                        </ul>
                    </div>
                    <div className='card p-3 mb-3'>
                        <h3>Trazado de Canales (USD/ML):</h3>
                        <p>
                            <strong>Descripción del Servicio:</strong> Diseña canales específicos para el transporte eficiente del agua, minimizando la erosión y maximizando la capacidad de drenaje. Este servicio es crucial para la planificación del manejo hídrico en grandes extensiones de terreno.
                        </p>
                        <ul>
                            <li>
                                <strong>Canales de transporte (Línea):</strong> Representación de las rutas diseñadas para el flujo de agua, optimizando su desplazamiento.
                            </li>
                        </ul>
                    </div>
                    <div className='card p-3 mb-3'>
                        <h3>Trazado de Caminos (USD/ML):</h3>
                        <p>
                            <strong>Descripción del Servicio:</strong> Planificación de caminos que consideren la gestión hídrica, minimizando el impacto ambiental y facilitando el acceso a áreas clave. Este servicio busca integrar la infraestructura de transporte con el manejo sostenible del agua.
                        </p>
                        <ul>
                            <li>
                                <strong>Caminos (Línea):</strong> Diseño de rutas para el tráfico, teniendo en cuenta su efecto en el drenaje y la erosión del suelo.
                            </li>
                        </ul>
                    </div>
                    <div className='card p-3 mb-3'>
                        <h3>Optimización de Alcantarillas (USD/ML):</h3>
                        <p>
                            <strong>Descripción del Servicio:</strong> Mejora de la ubicación y el diseño de alcantarillas para garantizar un flujo hídrico eficiente y minimizar el riesgo de obstrucciones. Este servicio es vital para el mantenimiento de la infraestructura de drenaje.
                        </p>
                        <ul>
                            <li>
                                <strong>Alcantarillas (Punto):</strong> Localización y especificaciones técnicas de las alcantarillas dentro del diseño del drenaje.
                            </li>
                        </ul>
                    </div>
                    <div className='card p-3 mb-3'>
                        <h3>Tranques y Embalses (USD/ML):</h3>
                        <p>
                            <strong>Descripción del Servicio:</strong> Diseño y gestión de estructuras que permiten almacenar y regular el agua, facilitando su uso para riego y otras aplicaciones. Este servicio es esencial para optimizar el recurso hídrico en la región.
                        </p>
                        <ul>
                            <li>
                                <strong>Tranques (Área):</strong> Zonas dedicadas a la retención de agua, cuyo diseño se basa en la topografía y las necesidades hídricas del entorno.
                            </li>
                        </ul>
                    </div>
                    <div className='card p-3 mb-3'>
                        <h3>Movimiento de Tierras (USD/ML):</h3>
                        <p>
                            <strong>Descripción del Servicio:</strong> Planificación y ejecución del movimiento de tierras necesarias para optimizar el drenaje y el manejo del agua en el terreno. Este servicio permite un ajuste adecuado de la topografía para mejorar el flujo hídrico.
                        </p>
                        <ul>
                            <li>
                                <strong>Movimientos de tierra (Área):</strong> Zonas donde se proyecta realizar excavaciones o rellenos, considerando la gestión del agua.
                            </li>
                        </ul>
                    </div>
                </div>;
            case 'herramienta4':
                return <div>
                    <div className='card p-3 mb-3'>
                        <h3>Modelos de SOC (carbono orgánico del suelo) EOS:</h3>
                        <p>
                            <strong>Descripción del Servicio:</strong> Evaluación y análisis del carbono orgánico en el suelo, permitiendo implementar prácticas sostenibles en el manejo agrícola y forestal. Este servicio es fundamental para fomentar la salud del suelo y contribuir a la mitigación del cambio climático.
                        </p>
                        <ul>
                            <li>
                                <strong>Modelos de SOC (Área):</strong> Proyecciones y análisis detallados del carbono orgánico en los suelos, contribuyendo a la toma de decisiones sobre prácticas de manejo.
                            </li>
                        </ul>
                    </div>
                </div>;
            case 'herramienta5':
                return <div>
                    <div className='card p-3 mb-3'>
                        <h3>Elementos etiquetados e instrucciones en terreno:</h3>
                        <p>
                            <strong>Descripción del Servicio:</strong> Proporciona información visual y orientación en el terreno, facilitando la ejecución de proyectos y mejorando la comprensión de las intervenciones necesarias. Este servicio integra la tecnología de realidad aumentada para una interacción más intuitiva con el paisaje.
                        </p>
                        <ul>
                            <li>
                                <strong>Etiquetas de elementos (Punto):</strong> Información contextualizada sobre cada elemento en el terreno, mejorando la capacidad de identificación y acción.
                            </li>
                            <li>
                                <strong>Instrucciones (Texto):</strong> Guías claras y concisas para el usuario, facilitando la implementación de las prácticas recomendadas.
                            </li>
                        </ul>
                    </div>
                </div>;
            default:
                return null;
        }
    };

    return (
        <div className='m-5'>
            <input type="text" className="bg-white mt-3 mb-3 text-start" placeholder="Buscar servicios..." />
            <div>
                <nav className="nav nav-pills flex-column flex-sm-row">
                    <button
                        className={`flex-sm-fill text-sm-center nav-link ${activeTab === 'herramienta1' ? 'active' : ''}`}
                        onClick={() => setActiveTab('herramienta1')}
                    >
                        Análisis Geográfico
                    </button>
                    <button
                        className={`flex-sm-fill text-sm-center nav-link ${activeTab === 'herramienta2' ? 'active' : ''}`}
                        onClick={() => setActiveTab('herramienta2')}
                    >
                        Ingeniería Conceptual
                    </button>
                    <button
                        className={`flex-sm-fill text-sm-center nav-link ${activeTab === 'herramienta3' ? 'active' : ''}`}
                        onClick={() => setActiveTab('herramienta3')}
                    >
                        Ingeniería de Detalles
                    </button>
                    <button
                        className={`flex-sm-fill text-sm-center nav-link ${activeTab === 'herramienta4' ? 'active' : ''}`}
                        onClick={() => setActiveTab('herramienta4')}
                    >
                        Ejecución y Seguimiento
                    </button>
                    <button
                        className={`flex-sm-fill text-sm-center nav-link ${activeTab === 'herramienta5' ? 'active' : ''}`}
                        onClick={() => setActiveTab('herramienta5')}
                    >
                        Visualización AR
                    </button>
                </nav>

                <div className="mt-3">
                    {renderContent()}
                    <button onClick={() => navigate('/analisis')} className="btn btn-primary">
                        Crear proyecto
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Herramientas;