# Karnaugh Map  
Deber de la UNIR

# Interfaz de uso  
## Conversor de binario a decimal  
**ruta [GET]**: ```/conversor/binaryToDecimal?value=xxxx```  
**descripción**: Transforma un valor binario a decimal. El valor proveido debe ser una cadena de valores binarios sin espacios. El valor binario debe ser de máximo 16 bits (si se desea cambiar esto, modificar la variable de entorno *MAX_BITS* que por defecto está a 16).  
**Respuesta**: La respuesta será el valor transformado a decimal. A continuación un ejemplo de la respuesta:  
```
{
    "ok": true,
    "message": "Conversión realizada con éxito",
    "input": "0110",
    "output": 6
}
```

## Conversor ecuación booleana a tabla de verdad
**ruta [POST]**: ```/trueTable```  
**body**: 
1. **equation**: String - Aquí irá la ecuación sin paréntesis y utilizando un apóstrofe (') para negar. Por ejemplo, la siguiente ecuación no sería válida ```(ABC)' + D``` puesto que ABC están dentro de un factor negado; la forma correcta sería escribir cada elemento del factor negado, de la siguiente manera ```A'B'C' + D ```.

**descripción**: Crea una tabla de verdad a partir de una ecuación booleana. La ecuación deberá tener como variable las letras de la A a la Z y la negación se expresará con un apostrofe ('), ejemplo: ```A'B + C```.  
**Respuesta**: La respuesta del servidor será la salida de la tabla de verdad, es decir, solo la última columna, la que contendría los valores de verdad en donde la ecuación se haría verdadera o falsa. Por ejemplo, si se tiene la siguiente tabla:  
```
+-+-+-+  
|A|B|R|    
+-+-+-+  
|0|0|0|  
|0|1|1|  
|1|0|0|  
|1|1|1|  
+-+-+-+  
```  
Los valores de verdad son los que están en la columna *R*, y esa sería la salida que devolverá el servidor. A continuación un ejemplo de respuesta del servidor, en donde solo devolverá la columna de salida con su respectivo índice en decimal (si este índice se transforma a binario ya se tendría la tabla de verdad, pero por eficiencia no se hace):  
```
{
    "ok": true,
    "message": "Tabla de verdad creada correctamente",
    "equation": "AB+C'",
    "output": {
        "0": 1,
        "1": 0,
        "2": 1,
        "3": 0,
        "4": 1,
        "5": 0,
        "6": 1,
        "7": 1
    }
}
```