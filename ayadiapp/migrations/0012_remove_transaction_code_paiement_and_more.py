# Generated by Django 4.2.3 on 2024-08-29 16:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ayadiapp', '0011_alter_facture_id_facture_alter_facture_note_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='transaction',
            name='code_paiement',
        ),
        migrations.RemoveField(
            model_name='transaction',
            name='wallet',
        ),
    ]