# TP Final de BBDD2

#### Requerimientos
* MySQL
* Docker

crear tabla en mysql (simple_twitter) y dynamo (SimpleTwitterLocal)

Utilidades
* `npm install -g dynamodb-admin` para instalar una interfaz de DynamoDB

Para correr la version descargable de DynamoDB en vez de la imagen de docker se debe descargar la versión, guardar en el proyecto y correr:
`java -D"java.library.path=./DynamoDBLocal_lib" -jar DynamoDBLocal.jar`


## Análisis de los casos de uso

- Quiero la información en detalle de un usuario
Este es el caso de uso más simple. En mysql es una simple query sobre la tabla 'users', sin la necesidad de hacer ningún join. En dynamodb, se realiza un GetItem, donde viene toda la información del usuario.
- Quiero los tweets de un usuario ordenados por más recientes
En mysql es una simple query sobre la tabla 'tweets', teniendo que hacer un join con la tabla 'pictures' para poder tener las imágenes asociadas a cada tweet. En dynamodb, se realiza una Query, donde cada item (tweet) tiene las imágenes ya cargadas.
- Quiero la información de un tweet en particular
En mysql es una simple query sobre la tabla 'tweets', teniendo que hacer un join con la tabla 'pictures' para poder tener las imágenes asociadas a cada tweet. En cambio, en dynamodb se realiza un GetItem solamente porque las imágenes del tweet se guardan en el mismo item, ya que es un dato inmutable que no tiene un patrón de acceso establecido.
- Quiero saber si un usuario le dió like a un tweet
En mysql, es una simple query en la tabla likes, donde nos fijamos si existe una tupla con el tweetId y userId. Si existe, entonces el user le dio like a ese tweet. En dynamodb, es algo similar donde se hace un GetItem.
- Quiero ver los últimos tweets que un usuario le dió like
La complejidad de este caso de uso es que cada tweet debería venir con la información de sus imágenes y de su usuario creados. Por esto, en mysql se deben hacer dos joins. En dynamodb, aumenta la complejidad a comparación de los otros casos de uso. Primero se hace una query sobre un índice secundario (GSI1), y luego se realizan dos GetBatchItems para poder obtener la información total de cada tweet y de cada usuario creados. Esto hace que sean 3 accesos a la DB para resolverlo.
- Quiero ver las respuestas a un tweet con información del usuario ordenadas por más recientes
Cada tweet debe venir con la información del usuario creador, por lo que en mysql se realiza un join con la tabla 'users'. En dynamodb, se realiza una query y un BatchGetItems.

# Tiempos de ejecución

Para comparar los tiempos de ejecución entre MySQL y DynamoDB en diferentes casos de uso, se llevó a cabo un experimento en el que se midió el tiempo de ejecución de cada caso de uso en ambas bases de datos. Los resultados obtenidos fueron los siguientes:

## Pocos datos (1x)

| Caso de uso | MySQL | DynamoDB |
| -------- | -------- | -------- |
| Get tweet     | 0.97 ms     | 8.23 ms     |
| Get user     | 0.93 ms     | 7.85 ms     |
| List last tweets of user     | 1.09 ms     | 8.49 ms     |
| User liked tweet?     | 3.27 ms     | 7.85 ms     |
| List responses of tweet     | 1.08 ms     | 21.59 ms     |
| List last liked tweets by user     | 1.39 ms     | 35.17 ms     |



## Bastantes datos (100x)

| Caso de uso | MySQL | DynamoDB |
| -------- | -------- | -------- |
| Get tweet     | 1.6 ms     | 10.55 ms     |
| Get user     | 1.3 ms     | 8.41 ms     |
| List last tweets of user     | 2.25 ms     | 8.13 ms     |
| User liked tweet?     | 2.9 ms     | 8.5 ms     |
| List responses of tweet     | 1.03 ms     | 21.41 ms     |
| List last liked tweets by user     | 3.89 ms     | 34.89 ms     |

## Muchos datos (600x)

| Caso de uso | MySQL | DynamoDB |
| -------- | -------- | -------- |
| Get tweet     | 7.95 ms     | 12.11 ms     |
| Get user     | 5.75 ms     | 10.57 ms     |
| List last tweets of user     | 21.25 ms     | 10.15 ms     |
| User liked tweet?     | 4.05 ms     | 10.87 ms     |
| List responses of tweet     | 1.21 ms     | 21.89 ms     |
| List last liked tweets by user     | 42.8 ms     | 34.84 ms     |


## Conclusiones

Como podemos ver, MySQL tiene una mejor performance en todos los casos de uso, pero se puede ver claramente que a medida que aumenta la cantidad de datos almacenados, los tiempos de mysql aumentan pero los de dynamodb se mantienen o aumentan muy poco. Esto confirma lo que se puede ver en esta gráfica:

![](https://i.imgur.com/dcb59aT.png)

Si bien las pruebas de este proyecto no se hicieron con GBs de datos, la tendencia se puede ver fácilmente.

Con respecto a la complejidad del modelado, MySQL demuestra una facilidad mayor en comparación de dynamodb. Esto se debe a que en mysql se puede pensar todo el modelo sin la necesidad de tener en cuenta todos los patrones de acceso que tendrá la aplicación. En cambio, en dynamodb este aspecto es fundamental: no se puede empezar a modelar la tabla (con sus claves de partición y de ordenación) sin tener perfectamente sabido cómo se accederá a los datos. En este aspecto, es muy complejo pensar cómo serán las PKs, SKs y GSIs de la tabla. Cuando en mysql salió todo sencillo, en dynamo tomó mucho más tiempo realizarlo.