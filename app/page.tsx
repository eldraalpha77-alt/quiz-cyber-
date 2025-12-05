"use client"



import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button";
      const { data, error } = await supabase
        .from('question')
        .select(`
          id,
          texte,
          reponses:reponse (
            id,
            texte,
            est_correcte
          )
        `)
        .order('id', { ascending: true });
        
export default function Home() {
  const [question, setQuestion] = useState<any>(null);
  const [afficherAlerte, setAfficherAlerte] = useState<boolean>(false);
  useEffect(() => {
    async function fetchQuestion() {
      const { data, error } = await supabase
        .from('question')
        .select(`
          id,
          texte,
          reponses:reponse (
            id,
            texte,
            est_correcte  
          )        
        `)

      if (error) console.log(error);
      else setQuestion(data[0]); // On stocke la première question dans l’état
    }

    fetchQuestion();
    // setAfficherAlerte(true);
  }, []);


  function handleClick(reponse: any) {
    if (reponse.est_correcte) {
      alert("Bonne réponse !");
    } else {
      alert("Mauvaise réponse.");
    }
  }
  

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
        <div>
          <Card className="max-w-xl mx-auto mt-6">
            <CardHeader>
              <CardTitle>Question</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{question.texte}</p>
            </CardContent>
          </Card>
          <Card>
          {question.reponses.map((reponse: any) => (
            <Button
              key={reponse.id}
              onClick={() => handleClick(reponse)}
              className="w-full justify-start mt-4"
              variant="outline"
            >
              {reponse.texte}
            </Button>
          ))}
          </Card>
        </div>
      ) : (
        <p>Chargement de la question...</p>
      )}



    </div>
  )
}
