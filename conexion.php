<?php
// archivo: conexion.php
header('Content-Type: application/json');
$conn = pg_connect("host=ep-noisy-violet-a9tp3qwi-pooler.gwc.azure.neon.tech
                    port=5432
                    dbname=PR2
                    user=neondb_owner
                    password=npg_AO2oW9CMzNlX
                    sslmode=require");

if (!$conn) {
    echo "❌ Error de conexión.";
    exit;
}

$result = pg_query($conn, "SELECT * FROM tu_tabla");

$data = [];
while ($row = pg_fetch_assoc($result)) {
    $data[] = $row;
}


echo json_encode($data);
?>
