import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader, ChevronRight, HelpCircle, Calendar, Search, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatOption = ({ text, icon: Icon, onClick, withArrow = true }) => (
  <motion.button
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="w-full p-4 mb-3 text-left bg-white hover:bg-gray-50 
    rounded-2xl transition-all duration-300 border border-gray-100
    shadow-sm hover:shadow-md group flex items-center gap-3
    relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    
    <div className="h-8 w-8 flex items-center justify-center rounded-xl bg-blue-100/80 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
      <Icon size={18} />
    </div>
    
    <span className="flex-grow font-medium text-gray-700 group-hover:text-gray-900">{text}</span>
    
    {withArrow && (
      <ChevronRight 
        size={18} 
        className="text-gray-400 group-hover:text-gray-600 transform group-hover:translate-x-1 transition-all" 
      />
    )}
  </motion.button>
);

const BotMessage = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex gap-3 mb-4"
  >
    <div className="h-8 w-8 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
      <MessageCircle size={16} className="text-blue-600" />
    </div>
    <div className="bg-white p-4 rounded-2xl rounded-tl-md shadow-sm max-w-[80%] text-gray-700">
      {children}
    </div>
  </motion.div>
);

const UserMessage = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex gap-3 mb-4 justify-end"
  >
    <div className="bg-blue-600 p-4 rounded-2xl rounded-tr-md shadow-sm max-w-[80%] text-white">
      {children}
    </div>
  </motion.div>
);

const TypingIndicator = () => (
  <div className="flex gap-3 mb-4">
    <div className="h-8 w-8 rounded-xl bg-blue-100 flex items-center justify-center">
      <Loader size={16} className="text-blue-600 animate-spin" />
    </div>
    <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-md shadow-sm">
      <div className="flex gap-2">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-gray-300"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, delay: 0.2, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-gray-300"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, delay: 0.4, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-gray-300"
        />
      </div>
    </div>
  </div>
);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const chatOptions = {
    initial: [
      { id: 'reservar', text: 'Realizar una reserva', icon: Calendar },
      { id: 'ayuda', text: 'Centro de ayuda', icon: HelpCircle }
    ],
    reservar: [
      { id: 'nuevo', text: 'Nueva reserva', icon: Calendar },
      { id: 'volver', text: 'Volver al menú principal', icon: ChevronRight }
    ],

    ayuda: [
      { id: 'guia', text: 'Guía de uso', icon: HelpCircle },
      { id: 'volver', text: 'Volver al menú principal', icon: ChevronRight }
    ]
  };

  const botResponses = {
    nuevo: `Te ayudaré a realizar una nueva reserva.

📅 ve a la seccion de reservar, escoge entre los espacios disponibles y sigue los pasos`,

    guia: `📖 Guía Rápida de Uso

1. Reserva en 3 pasos:
   • Selecciona el espacio
   • Elige fecha y hora
   • Confirma los detalles`,

  };

  useEffect(() => {
    if (messages.length === 0 && isOpen) {
      simulateTyping(
        "¡Hola! 👋 Soy el asistente virtual de Unicomfacauca. ¿En qué puedo ayudarte hoy?"
      );
      setCurrentOptions(chatOptions.initial);
    }
    scrollToBottom();
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const simulateTyping = async (text) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setMessages(prev => [...prev, { text, isBot: true }]);
    setIsTyping(false);
  };

  const handleOptionClick = async (option) => {
    setMessages(prev => [...prev, { text: option.text, isBot: false }]);

    if (option.id === 'volver') {
      await simulateTyping("¿En qué más puedo ayudarte? 😊");
      setCurrentOptions(chatOptions.initial);
    } else if (chatOptions[option.id]) {
      await simulateTyping("Selecciona una opción:");
      setCurrentOptions(chatOptions[option.id]);
    } else if (botResponses[option.id]) {
      await simulateTyping(botResponses[option.id]);
      await simulateTyping("¿Hay algo más en lo que pueda ayudarte?");
      setCurrentOptions(chatOptions.initial);
    }
  };

  return (
    <>
      {/* Botón flotante */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-lg
            hover:bg-blue-700 transition-colors duration-300"
          >
            <MessageCircle size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Ventana del chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-6 right-6 w-96 bg-gray-50 rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-white px-6 py-4 border-b flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <MessageCircle className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Asistente Virtual</h3>
                  <p className="text-sm text-gray-500">Unicomfacauca</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Chat Content */}
            <div className="h-[500px] overflow-y-auto p-6 bg-gray-50">
              {messages.map((message, index) => (
                message.isBot ? (
                  <BotMessage key={index}>{message.text}</BotMessage>
                ) : (
                  <UserMessage key={index}>{message.text}</UserMessage>
                )
              ))}
              {isTyping && <TypingIndicator />}
              
              <div className="space-y-2 mt-4">
                {currentOptions.map((option) => (
                  <ChatOption
                    key={option.id}
                    text={option.text}
                    icon={option.icon}
                    onClick={() => handleOptionClick(option)}
                  />
                ))}
              </div>
              <div ref={messagesEndRef} />
            </div>

            {/* Footer */}
            <div className="p-4 bg-white border-t">
              <p className="text-xs text-center text-gray-500">
                Unicomfacauca - Asistente Virtual
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;