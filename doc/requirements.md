
As a user when I give the program a file it should read in the information from the file line by line.
As a user I then expect the program to split the emails from the passwords, encrypt the passwords, then reattach the emails to the passwords.
As a user I expect the program to then upload to MongoDB the emails, and the passwords in their encrypted form.
As a user I should then receive a file with all of the emails attached to the encrypted passwords, with each pairing of email and password on a seperate line.

As a user when I give an email and password combination to the program then the software should check the combination matches information in the database and return true if so.
As a user when I give an email and password combination to the program then the software should return false if the combination does not match what is in the dabase.
As a user when I give a an email and password combination that is not in the database then the software should return false.
As a user when I give an email without a password to the software, the software should return false.

