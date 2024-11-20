from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Añade esta línea para habilitar CORS en toda la aplicación

# Configuración de MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'introduccion'

mysql = MySQL(app)

@app.route('/productos', methods=['GET'])
def obtener_productos():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM productos")
    productos = cur.fetchall()
    cur.close()
    return jsonify(productos)

@app.route('/producto', methods=['POST'])
def agregar_producto():
    nuevo_producto = request.json
    nombre = nuevo_producto['nombre']
    precio = nuevo_producto['precio']
    stock = nuevo_producto['stock']
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO productos (nombre, precio, stock) VALUES (%s, %s, %s)", (nombre, precio, stock))
    mysql.connection.commit()
    cur.close()
    return jsonify({"mensaje": "Producto agregado"}), 201

@app.route('/pedido', methods=['POST'])
def realizar_pedido():
    pedido = request.json
    usuario_id = pedido['usuario_id']
    producto_id = pedido['producto_id']
    cantidad = pedido['cantidad']
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO pedidos (usuario_id, producto_id, cantidad) VALUES (%s, %s, %s)", (usuario_id, producto_id, cantidad))
    mysql.connection.commit()
    cur.close()
    return jsonify({"mensaje": "Pedido realizado"}), 201

@app.route('/usuarios', methods=['POST'])
def registrar_usuario():
    usuario = request.json
    nombre = usuario['nombre']
    email = usuario['email']
    contraseña = usuario['contraseña']
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO usuarios (nombre, email, contraseña) VALUES (%s, %s, %s)", (nombre, email, contraseña))
    mysql.connection.commit()
    cur.close()
    return jsonify({"mensaje": "Usuario registrado"}), 201

@app.route('/usuario/<int:id>', methods=['GET'])
def obtener_usuario(id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM usuarios WHERE id = %s", (id,))
    usuario = cur.fetchone()
    cur.close()
    if usuario:
        return jsonify(usuario)
    else:
        return jsonify({"mensaje": "Usuario no encontrado"}), 404

@app.route('/usuario/<int:id>', methods=['PUT'])
def actualizar_usuario(id):
    datos_usuario = request.json
    nombre = datos_usuario.get('nombre')
    email = datos_usuario.get('email')
    contraseña = datos_usuario.get('contraseña')
    cur = mysql.connection.cursor()
    cur.execute("UPDATE usuarios SET nombre = %s, email = %s, contraseña = %s WHERE id = %s", (nombre, email, contraseña, id))
    mysql.connection.commit()
    cur.close()
    return jsonify({"mensaje": "Usuario actualizado"}), 200

@app.route('/historial_pedidos/<int:usuario_id>', methods=['GET'])
def obtener_historial_pedidos(usuario_id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM pedidos WHERE usuario_id = %s", (usuario_id,))
    pedidos = cur.fetchall()
    cur.close()
    return jsonify(pedidos)

@app.route('/preferencias/<int:usuario_id>', methods=['GET', 'POST', 'PUT'])
def gestionar_preferencias(usuario_id):
    if request.method == 'GET':
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM preferencias WHERE usuario_id = %s", (usuario_id,))
        preferencias = cur.fetchone()
        cur.close()
        return jsonify(preferencias)
    elif request.method == 'POST':
        preferencias = request.json
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO preferencias (usuario_id, categoria_favorita, color_favorito) VALUES (%s, %s, %s)", (usuario_id, preferencias['categoria_favorita'], preferencias['color_favorito']))
        mysql.connection.commit()
        cur.close()
        return jsonify({"mensaje": "Preferencias agregadas"}), 201
    elif request.method == 'PUT':
        preferencias = request.json
        cur = mysql.connection.cursor()
        cur.execute("UPDATE preferencias SET categoria_favorita = %s, color_favorito = %s WHERE usuario_id = %s", (preferencias['categoria_favorita'], preferencias['color_favorito'], usuario_id))
        mysql.connection.commit()
        cur.close()
        return jsonify({"mensaje": "Preferencias actualizadas"}), 200

if __name__ == '__main__':
    app.run(debug=True)
