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
## Pocos datos (1x)

80

### Tiempos de ejecución

| Caso de uso | MySQL | DynamoDB |
| -------- | -------- | -------- |
| Get tweet     | 0.97 ms     | 8.23 ms     |
| Get user     | 0.93 ms     | 7.85 ms     |
| List last tweets of user     | 1.09 ms     | 8.49 ms     |
| User liked tweet?     | 3.27 ms     | 7.85 ms     |
| List responses of tweet     | 1.08 ms     | 21.59 ms     |
| List last liked tweets by user     | 1.39 ms     | 35.17 ms     |

### Conclusiones
En general, se observa que MySQL tiene tiempos de ejecución más bajos que DynamoDB en la mayoría de los casos de uso. Esto se debe a que MySQL es una base de datos relacional que utiliza índices para acceder rápidamente a los datos, mientras que DynamoDB es una base de datos no relacional que no utiliza índices y debe escanear todos los datos para realizar consultas.

Sin embargo, es importante tener en cuenta que los tiempos de ejecución varían en función del tamaño de la base de datos y del número de consultas concurrentes. Por lo tanto, es necesario realizar pruebas con bases de datos de tamaño más grande y con un mayor número de consultas concurrentes para obtener una comparación más precisa.


## Bastantes datos (100x)

8000

### Tiempos de ejecución

| Caso de uso | MySQL | DynamoDB |
| -------- | -------- | -------- |
| Get tweet     | 1.6 ms     | 10.55 ms     |
| Get user     | 1.3 ms     | 8.41 ms     |
| List last tweets of user     | 2.25 ms     | 8.13 ms     |
| User liked tweet?     | 2.9 ms     | 8.5 ms     |
| List responses of tweet     | 1.03 ms     | 21.41 ms     |
| List last liked tweets by user     | 3.89 ms     | 34.89 ms     |

### Conclusiones

## Muchos datos (600x)

49000

### Tiempos de ejecución

| Caso de uso | MySQL | DynamoDB |
| -------- | -------- | -------- |
| Get tweet     | 7.95 ms     | 12.11 ms     |
| Get user     | 5.75 ms     | 10.57 ms     |
| List last tweets of user     | 21.25 ms     | 10.15 ms     |
| User liked tweet?     | 4.05 ms     | 10.87 ms     |
| List responses of tweet     | 1.21 ms     | 21.89 ms     |
| List last liked tweets by user     | 42.8 ms     | 34.84 ms     |

### Conclusiones
