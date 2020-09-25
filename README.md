# Back_kittens

## Ejecución proyecto

        git clone https://github.com/GinesNC/Back_kittens.git
        cd Back_kittens/back_kittens
        npm install

Varias opciones para ejecutar (elegir 1 de estas 3, estando en el directorio correcto )

        npm start
        nodemon
        node ./bin/www

La creación de la base de datos y el usuario necesario, se puede realizar con ayuda del script: [pixomaticgnc.sql](https://github.com/GinesNC/Back_kittens/blob/master/pixomaticgnc.sql).

## Rutas disponibles:

Companies

       Listar: /companies
       Insertar: /companies/insert?name=<name>&email=<email>&CCC=<ccc>&CIF=<cif>&shortdesc=<shortdesc>&description=<description>&logo=<url logo>&date=<date>&status=0
       Editar: /companies/update?<datos a modificar>&id=<id>&token=<token>
       Buscar: /companies/search?search=<cadena a buscar>

Owners

        Listar: /owners
                /owners?page=<n pag>
        Info :  /owners/:id
        Post del usuario: /owners/:id/post

Favorites

        Insertar fav: /favorites??companid=<id_companie>&ownerid=<id owner>

## Tareas desarrolladas
Misión 1:
- [x] Tarea A
- [x] Tarea B
- [x] Tarea C
- [x] Tarea D
- [x] Reto A
- [x] Reto B
- [x] Reto C

Misión 2:
- [x] Tarea A
- [x] Tarea B
- [x] Tarea C
- [ ] Reto A
- [ ] Reto B

Misión 3:
- [x] Tarea A
- [x] Tarea B
- [ ] Reto A
- [ ] Reto B

##


## Misión 1. Crear una API de Empresas Gatunas

### A. Creación de Empresas

En este caso para la creación de la base de datos he usado:
-    id  : Como entero, autoincrementado y como primary key. 
-    name: Como varchar de 20 carácteres, ya que el nombre puede ser alfanúmerico.
-    CIF : Como varchar de 9 caracteres y como unique, para que no se pueda repetir. Esta columna también se puede establecer como primary key.
-    shortdesc: varchar(100),
-    description: varchar(500),
-    email: varchar(20),
-    CCC: varchar(19),
-    date: Como date, porque se registra solo la fecha
-    status: tinyint(1), para establecer el valor 0 como cerrado por vacaciones y 1 como abierto.
-    logo: varchar(50)
-    token: varchar(45), pueden ser valores alfanuméricos.

Los valores que he establecido para que no puedan ser nulos son:
- El id porque es la clave privada y el identificador de la empresa.
- Los campos name, description, email, cif y logo, porque son campos importantes para identicar correctamente a una empresa. Si alguno de estos es nulo se devolverá el correspondiente error.

El correspondiente endpoint es una petición POST a ```/companie/insert```. Los campos máximos que se pueden pasar son 8, quitando id y token. Los mínimos son 5: name, description, email, CIF, logo.

Sí se intenta realizar la petición con mas de 8, menos de 5 o con el token o id, dicha petición es enviada al log y se trata como una potencialmente peligrosa.

### B. Editar Empresa y Reto B. Securizando la API Editar

Para editar una empresa es una petición PATCH a la ```/companies/update``` y se le pasan los parámetros que se quieran modificar, así como el id para identificar a la empresa y el token asociado. 
Si se recibe algún parámetro que no se debe modificar devuelve un error como este:

    {error: "Imposible acceder a esos datos para modificar. Contacte con el administrador"}

En el caso que se intente modificar una columna que no exista se obtendrá el error:

    {
        "code": 404,
        "status": "ERROR",
        "error": {
            "error_code": "ER_BAD_FIELD_ERROR",
            "error_info": "Unknown column 'namee' in 'field list'"
        }
    }

En el caso que se intente modificar una petición sin tokeo o id devuelve el error:
     ({ error: "Imposible modificar falta id o token." });

### C. Listar Empresas

Listar todas las empresas, es una petición GET a ```/companies``` la cual devuelve todas las empresas registradas en el sistema.
Los datos para mostrar son:
-    Name, Para identificar la empresa por el nombre.
-    Shortdesc, para ver en pocas palabras a lo que se dedica.
-    Logo, El logo de la empresa.
-    Status, sí se encuentra de vacaciones o no.
 Los otros datos como:
-    Description, para cuando se entre en la página de la empresa, que se vea una descripción más amplia.
-    CIF, no es necesario mosrar el dato ya que no influye en la decisión del dueño y es información sensible
-    Date al igual que cif, en el listado no es relevante para la eleccion.
-    CCC es una información sensible, que un usuario no tiene por que ver en este listado, si no cuando vaya a contratar el servicio.
-    Email, ocurre igual, en el listado no es necesario mostrarlo, esta información debe ir en la info más detallada.
    

### D. Buscar Empresas

Busca todas las empresas que coincidan con el parámetro de la búsqueda. En el back se realiza un SELECT con una condición ```WHERE description LIKE %tosearch%```, para buscar en toda la columna esa cadena de carácteres exacta, dando igual la posición en la que se encuentre.

Se hace la petición ```GET a /search?search="data to search"```.
Si ese parámetro tiene un tamaño menor de 3 letras se considera potencialmente peligrosa y se almacena en log. Se considera sospechosa porque así se especifica en la misión 3.

### RETO A. API paginadas

Las empresas se listan con una petición ``GET a /companies?page=N``. Internamente la petición que se hace a la base de datos es: 

    "SELECT name, shortdesc, email, logo, status  from companies LIMIT init_page,fin_page"  

donde los valores init y fin page son: 

    var init_page = (page - 1) * 20 ;  -> para el OFFSET
    var fin_page = page * 20 - 1; -> para el LIMIT

En este caso se siguen mostrando 20 elementos, desde el 0 al 19. Así también se muestra el primer registro.

Cuando se solicita una página que no existe se devuelve el error: 

        {
            "code": 404,
            "error": "No esxisten tantos elementos"
        }


### RETO C. Seguridad
#### ¿Por qué crees que el método anterior puede no ser del todo seguro?

Porque el token se envia entre el cliente y el back en texto plano y se puede obtener facilmente. 
Una solución es que dicho token vaya cifrado, por ejemplo con AES y una clave que solo conozca la empresa, así como simpre usar HTTPS. 

_____________________________________


## Misión 2. Integrando con la API de Usuarios

### A. API Pasarela de Usuarios

Petición request GET a la api con:

    url = 'https://gorest.co.in/public-api/users?access-token=' + GorestToken + '&page=' + page

Esta petición devuelve los 20 owners de la página especificada


### B. Crear una API de Favoritos
Petición que hace a companies e owners para ver si existe la variable en cuestión.
En la base de datos se a creado la restricción:

        ALTER TABLE pixomaticgnc.favorites ADD CONSTRAINT uniqueFav UNIQUE (owner_id , companie_id);

Para que no se pueda repetir el mismo usuario y la misma empresa más de una vez

### C.Extrayendo la info del Dueño

Para obtener la información con los post, realizar la petición de los usuarios, almacenarla en un JSON y añadir otro campo post, en este se insertan los post pertenecientes al usuario.

### Reto A. 
En este caso no he consegido obtener correctamente el resultado. Mi forma de hacerlo sería:
-    Dentro de un bucle realizar tantas peticiones a la api de gotest como limit/20. 
-    El resultado de cada petición lo almacenaría en una variable, la cual devolvería formateada con todos los datos


### Reto B. 

Lo que yo haría en este caso es ver el array de posts que me ha devuelto y almacenarlo. De esos post obtengo su id, el cual utilizo para buscar en los comentarios los pertenecientes a ese post. Una vez encontrados los comentarios, los asociaría al post correspondiente. Cuando se ha completado toda la iteración de los post y todos contienen sus respectivos comentarios, devuelvo esta nueva variable.
    

__________________________
## Misión 3. Seguridad y rendimiento

### A. Logs y Seguridad 
Estos log se escriben con logger, elemento que he declarado en el fichero ``logger.js``, el cual escribe en un fichero log cuando:
- Se intenta insertar en companie y si los datos son más de 9 o menos 5 o se intenta insertar un id o token se almacena en el log como petición peligrosa.
- Si se intenta buscar y contienen menos de 3 caracteres.


### B. Rendimineto
Almacenar la info de los usuarios en sesiones locales de cada usuairo.
Esta información solo se solicitará la primera vez que el usuairo acceda al sistema en caso de que llegue una petición de modificación, esa sesión también se modificará.

<!-- es en sesiones ya que la información puede ser sensibles, y dicha info es más segura usando sesiones que cookies -->


### Reto A

En este caso lo que haría es comprobar la existencia del token si page > 10. Si dicho token existe, devuelvolvería los datos, en caso que no se corresponda con ningún token devolvería un mensaje de error y lo almacenaría en el log como petición peligrosa, si la misma ip hubiera realizado varias peticiones seguidas.

### Reto B
Una de las formas, a priori, que realizaría para ignorar la petición es añadir la ip de la que proviene a una tabla con ips que se ignoran y antes de cada petición comprobaría la tabla.
