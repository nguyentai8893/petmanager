'use strict';
 const saveToStorage =(key,value)=>{
    localStorage.setItem(key,value)
 }

  const getFromStorage =(key, defaul)=>{
    return localStorage.getItem(key) ??defaul
  }