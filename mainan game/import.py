import sqlite3
# koneksi ke database (membuat file jika belum ada)
conn = sqlite3.connect("kb.db")
cursor = conn.cursor()
# membuat tabel sederhana 
cursor.execute("""
CREATE TABLE IF NOT EXISTS warga(
    id TEXT PRIMARY KEY,
    nama TEXT 
    jenis_kelamin TEXT,
    nik TEXT,
    tanggal_lahir TEXT, 
    dusun TEXT,
    rt TEXT,
    rw TEXT,
    status_kawin TEXT
      )
               """)
print("table warga berhasil dibuat")
conn.close()