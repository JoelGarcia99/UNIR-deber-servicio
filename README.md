# Laboratorio de la UNIR 
Laboratorio de creación de un servicio.

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

## Conversor de decimal a binario  
**ruta [GET]**: ```/conversor/decimalToBinary?value=xxxx```  
**descripción**: Transforma un valor decimal a binario. El valor que le pasemos debe ser un entero positivo. El servicio responderá con el valor binario con 16 bits de precisión (si se desea cambiar esto, modificar la variable de entorno *MAX_BITS* que por defecto está a 16).  
**Respuesta**: La respuesta será el valor transformado a binario. A continuación un ejemplo de la respuesta:  
```
{
    "ok": true,
    "message": "Conversión realizada con éxito",
    "input": "15",
    "length": "16 bits",
    "output": "0000000000001111"
}
```

## Conversor ecuación booleana a tabla de verdad
**ruta [POST]**: ```/trueTable```  
**body**: 
1. **equation**: String - Aquí irá la ecuación de máximo 8 variables (si desea ampliar esto debe cambiar el valor de la variable ```MAX_VARIABLES```, que se encuentra en ```server\table\true_table.js``` y que por defecto es 8), sin paréntesis y utilizando un apóstrofe (') para negar. Por ejemplo, la siguiente ecuación no sería válida ```(ABC)' + D``` puesto que ABC están dentro de un factor negado; la forma correcta sería escribir cada elemento del factor negado, de la siguiente manera ```A'B'C' + D ```.

**descripción**: Crea una tabla de verdad a partir de una ecuación booleana. La ecuación deberá tener como variable las letras de la A a la Z y la negación se expresará con un apostrofe ('), ejemplo: ```A'B + C```.  
**Respuesta**: La respuesta del servidor será la salida de la tabla de verdad, es decir, solo la última columna, la que contendría los valores de verdad en donde la ecuación se haría verdadera o falsa. Por ejemplo, si se tiene la siguiente tabla:  
```  
equation = A'B+AB  
+-+-+-+  
|A|B|R|    
+-+-+-+  
|0|0|0|  
|0|1|1|  
|1|0|0|  
|1|1|1|  
+-+-+-+  
```  
Los valores de verdad son los que están en la columna *R*, y esa sería la salida que devolverá el servidor. A continuación un ejemplo de respuesta del servidor (con la misma ecuación de arriba), en donde solo devolverá la columna de salida con su respectivo índice en decimal (si este índice se transforma a binario ya se tendría la tabla de verdad, pero por eficiencia no se hace):  
```
{
    "ok": true,
    "message": "Tabla de verdad creada correctamente",
    "equation": "A'B+AB",
    "output": {
        "0": 0,
        "1": 1,
        "2": 0,
        "3": 1
    }
}
```