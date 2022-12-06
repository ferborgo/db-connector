# TP Final de BBDD2

#### Requerimientos
* MySQL
* Docker

crear tabla en mysql (simple_twitter) y dynamo (SimpleTwitterLocal)

Utilidades
* `npm install -g dynamodb-admin` para instalar una interfaz de DynamoDB

Para correr la version descargable de DynamoDB en vez de la imagen de docker.
`java -D"java.library.path=./DynamoDBLocal_lib" -jar DynamoDBLocal.jar`


# Conclusiones

Para comparar los tiempos de ejecución entre MySQL y DynamoDB en diferentes casos de uso, se llevó a cabo un experimento en el que se midió el tiempo de ejecución de cada caso de uso en ambas bases de datos. Los resultados obtenidos fueron los siguientes:

## Tiempos de ejecución con pocos datos

| Caso de uso | MySQL | DynamoDB |
| -------- | -------- | -------- |
| Get tweet     | 7 ms     | 119 ms     |
| Get user     | 5 ms     | 26 ms     |
| List last tweets of user     | 5 ms     | 91 ms     |
| User liked tweet?     | 9 ms     | 35 ms     |
| List responses of tweet     | 2 ms     | 77 ms     |
| List last liked tweets by user     | 5 ms     | 80 ms     |

## Conclusiones con pocos datos
En general, se observa que MySQL tiene tiempos de ejecución más bajos que DynamoDB en la mayoría de los casos de uso. Esto se debe a que MySQL es una base de datos relacional que utiliza índices para acceder rápidamente a los datos, mientras que DynamoDB es una base de datos no relacional que no utiliza índices y debe escanear todos los datos para realizar consultas.

Sin embargo, es importante tener en cuenta que los tiempos de ejecución varían en función del tamaño de la base de datos y del número de consultas concurrentes. Por lo tanto, es necesario realizar pruebas con bases de datos de tamaño más grande y con un mayor número de consultas concurrentes para obtener una comparación más precisa.