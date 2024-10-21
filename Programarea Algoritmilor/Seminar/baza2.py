
def baza2(nr):
    b2 = 0
    p = 1
    while nr != 0:
        b2 = b2 + (nr%2)*p
        nr = nr//2
        p = p*10
    return b2



nr = int(input("Numarul convertit in baza 2 este: "))
print(f"Numarul {nr} in baza 2 este: {baza2(nr)}")
print(f"Numarul {nr} in baza 2 este: {bin(nr)}")
