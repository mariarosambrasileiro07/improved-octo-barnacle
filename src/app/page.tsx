'use client'

import Checkbox from "@/components/Checkbox"
import ExibeSenha from "@/components/ExibeSenha"
import ForcaSenha from "@/components/ForcaSenha"
import opcoes from "@/data/OpcoesCaracteres"
import Senha from "@/model/Senha"
import { useEffect, useState } from "react"


export default function Home() {
  const [tamanho, setTamanho] = useState<number>(8)
  const [tiposCaracteres, setTiposCaracteres] = useState(opcoes)
  const [senha, setSenha] = useState("")
const [forcaSenha, setForcaSenha] = useState(1)

useEffect(()=>{
  setForcaSenha(Senha.calcularForca(tamanho, tiposCaracteres))
}, [tamanho, tiposCaracteres])

const lidarComMudanca = (indice:number)=>{
                const aux = [...tiposCaracteres]
                aux[indice].valor = !aux[indice].valor
                setTiposCaracteres([...aux])
              }

  const gerarSenha=()=>{
      const novaSenha = Senha.gerarSenha(tamanho, tiposCaracteres)
      setSenha(novaSenha)
  }

  return (
    <main className="flex  flex-col items-center justify-center h-full">
      <h1 className="text-4xl text-gray-200 mb-4 text-center font-bold">Gerador de Senhas</h1>
      <div className="w-3/12 bg-slate-700 text-gray-200 rounded-md p-8">
          <div className="flex gap-3 text-2xl flex-col">
            <label className="flex justify-between">
              <span>Tamanho da Senha:</span>
              <span className="text-blue-500">{tamanho}</span>
            </label>
            <input type="range"
            min={3}
            max={30} 
            value={tamanho}
            onChange={(e)=>setTamanho(+e.target.value)}/>
          </div>
         <div className="flex flex-col my-3">
           {tiposCaracteres.map((opcao, i)=>{
            return <Checkbox 
            id={opcao.id}
            key={opcao.id}
            texto={opcao.nome}
            selecionado={opcao.valor}
            lidaComMudanca={()=>lidarComMudanca(i)}
            />
          })}
         </div>
         <ForcaSenha forca={forcaSenha} />
            <button className="text-white bg-blue-500 text-lg font-bold w-full rounded p-2 mt-3 " onClick={gerarSenha}>Gerar Senha

            </button>
            <ExibeSenha senha={senha}/>
      </div>
    </main>
  )
}
