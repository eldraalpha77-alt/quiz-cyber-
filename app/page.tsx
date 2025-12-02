"use client"



import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"




export default function Home() {
  const [question, setQuestion] = useState<any>(null);
  const [afficherAlerte, setAfficherAlerte] = useState<boolean>(false);
  useEffect(() => {
    async function fetchQuestion() {
      const { data, error } = await supabase
        .from('question')
        .select('*');

      if (error) console.error(error);
      else setQuestion(data[0]); // On stocke la première question dans l’état
    }
    const question = {
      texte: "Quel est le mot de passe le plus sécurisé ?",
      reponses: [
        "123456",
        "azerty",
        "Une phrase longue avec des caractères spéciaux"
      ],
    };

    fetchQuestion();


    // setAfficherAlerte(true);
  }, []);


  return (
    <div>
      <h1>Bienvenue sur CyberQuiz</h1>

      <Alert className="bg-blue-50 border-blue-300 text-blue-800 max-w-xl mx-auto mt-6">
        <AlertTitle className="text-xl font-semibold">Bienvenue sur CyberQuiz</AlertTitle>
        <AlertDescription>
          Un quiz pour tester vos connaissances en cybersécurité.
        </AlertDescription>
      </Alert>
      {question ? (
        <Card className="max-w-xl mx-auto mt-6">
          <CardHeader>
            <CardTitle>Question</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{question.texte}</p>
          </CardContent>
        </Card>
      ) : (
        <p>Chargement de la question...</p>
      )}
      {question.reponses.map((reponse, index) => (
        <button key={index} onClick={() => handleClick(reponse)}>
          {reponse}
        </button>
      ))}

    </div>
  )
}
