import axios from "axios"


export const registerUserNew = async (input: {email: string}) => {
  const headers = {
    'Content-Type': 'application/json'
  }

  try{
    const response = await axios.post("https://qt.organogram.app/token", input, {headers})
    if(response.data){
      localStorage.setItem("qt-token", JSON.stringify(response.data.token))
    return response
    }

  } catch(err) {
    console.log('Register user err: ', err)

    }
  }

  export const createQuestion = async (input: {question: string; options: string[]}, token: string) => {
    const headers = {
      "Token": token, 
      'Content-Type': 'application/json'
    }
  
    try{
      const response = await axios.post("https://qt.organogram.app/questions", input, {headers})
      return response.data
  
    } catch(err) {
      console.log('Register user err: ', err)
  
      }
    }

    export const getAllQuestions = async (token: string) => {
      const headers = {
        "Token": token, 
        'Content-Type': 'application/json'
      }
    
      try{
        const response = await axios.get("https://qt.organogram.app/questions", {headers})
          localStorage.setItem("all-questions", JSON.stringify(response.data))
        return response.data
    
      } catch(err) {
        console.log('Register user err: ', err)
    
        }
      }

      export const deleteSingleQuestion = async (id: string, token: string) => {
        const headers = {
          "Token": token, 
          'Content-Type': 'application/json'
        }
      
        try{
          const response = await axios.delete(`https://qt.organogram.app/questions/${id}`, {headers})
          console.log('delete response: ', response)
          return response
      
        } catch(err) {
          console.log('Register user err: ', err)
      
          }
        }