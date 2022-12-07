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
| Get tweet     | 0.97 ms     | 8.23 ms     |
| Get user     | 0.93 ms     | 7.85 ms     |
| List last tweets of user     | 1.09 ms     | 8.49 ms     |
| User liked tweet?     | 3.27 ms     | 7.85 ms     |
| List responses of tweet     | 1.08 ms     | 21.59 ms     |
| List last liked tweets by user     | 1.39 ms     | 35.17 ms     |

## Conclusiones con pocos datos
En general, se observa que MySQL tiene tiempos de ejecución más bajos que DynamoDB en la mayoría de los casos de uso. Esto se debe a que MySQL es una base de datos relacional que utiliza índices para acceder rápidamente a los datos, mientras que DynamoDB es una base de datos no relacional que no utiliza índices y debe escanear todos los datos para realizar consultas.

Sin embargo, es importante tener en cuenta que los tiempos de ejecución varían en función del tamaño de la base de datos y del número de consultas concurrentes. Por lo tanto, es necesario realizar pruebas con bases de datos de tamaño más grande y con un mayor número de consultas concurrentes para obtener una comparación más precisa.