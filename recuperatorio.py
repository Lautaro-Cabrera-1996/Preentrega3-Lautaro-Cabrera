
productos = []
cantidades = []

while True:
    print("\n Menú de opciones:")
    print("1. Agregar producto")
    print("2. Ver productos agotados")
    print("3. Actualizar stock")
    print("4. Ver todos los productos")
    print("5. Salir")

    opcion = input("Seleccione una opción : ")

    if opcion == "1":
        nombre = input("Ingrese el nombre del producto: ")
        cantidad = int(input("Ingrese la cantidad: "))
        productos.append(nombre)
        cantidades.append(cantidad)
        print(f"Producto '{nombre}' agregado con {cantidad} unidades.")

    elif opcion == "2":
        print("\n Productos agotados:")
        hay_agotados = False
        for i in range(len(cantidades)):
            if cantidades[i] == 0:
                print(f"- {productos[i]}")
                hay_agotados = True
        if not hay_agotados:
            print("No hay productos agotados.")

    elif opcion == "3":
        nombre_buscar = input("Ingrese el nombre del producto a actualizar: ")
        encontrado = False
        for i in range(len(productos)):
            if productos[i] == nombre_buscar:
                nueva_cantidad = int(input("Ingrese la nueva cantidad: "))
                cantidades[i] = nueva_cantidad
                print(f"Stock de '{nombre_buscar}' actualizado a {nueva_cantidad}.")
                encontrado = True
                break
        if not encontrado:
            print("Producto no encontrado.")

    elif opcion == "4":
        print("\n Stock de productos:")
        if len(productos) == 0:
            print("No hay productos en el sistema.")
        else:
            for i in range(len(productos)):
                print(f"- {productos[i]}: {cantidades[i]} unidades")

    elif opcion == "5":
        print("Saliste del programa")
        break

    else:
        print("Opción incorrecta")