import tkinter as tk
import time
import threading

def start_countdown():
    try:
        total_seconds = int(entry.get())
    except ValueError:
        label.config(text="Masukkan angka!")
        return

    def countdown():
        nonlocal total_seconds
        while total_seconds >= 0:
            mins, secs = divmod(total_seconds, 60)
            time_format = f"{mins:02d}:{secs:02d}"
            label.config(text=time_format)
            time.sleep(1)
            total_seconds -= 1
        label.config(text="Waktu Habis!")

    # jalankan di thread supaya GUI tidak freeze
    threading.Thread(target=countdown, daemon=True).start()

# buat window utama
root = tk.Tk()
root.title("saipul keren ketceh")
root.geometry("400x250")

# atur background
root.config(bg="#bb5198")  # warna gelap (bisa diganti sesuai selera)

# label untuk menampilkan timer
label = tk.Label(root, text="00:00", font=("Arial", 48), bg="#56589E", fg="white")
label.pack(pady=40)

# input waktu
entry = tk.Entry(root, font=("times new roman", 16))
entry.pack(pady=10)

# tombol mulai
button = tk.Button(root, text="Mulai", font=("Arial", 14), command=start_countdown, bg="#61afef", fg="white")
button.pack(pady=10)

root.mainloop()
