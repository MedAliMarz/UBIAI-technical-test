# Generated by Django 3.2.7 on 2021-09-29 13:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Anno', '0002_auto_20210929_1307'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='label',
            name='document',
        ),
        migrations.AddField(
            model_name='annotation',
            name='document',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='Anno.document'),
        ),
    ]
