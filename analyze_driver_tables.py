#!/usr/bin/env python3
"""
Analyze products in duelink.json and identify which ones are missing driver tables
"""

import json
import os
import re
from pathlib import Path

def normalize_name(name):
    """Normalize product name for comparison with driver filenames"""
    # Convert to lowercase and handle special cases
    name = name.lower()
    
    # Handle specific mappings
    mappings = {
        'cincobit': 'cincobit',
        'clipit': 'clipit', 
        'dueduino': 'dueduino',
        'duestem': 'duestem',
        'pixobit': 'pixobit',
        'stamp': 'stamp',
        'stick': 'stick',
        'ghizzy jr': 'ghizzyjr',
        'ghizzy': 'ghizzy',
        'holiday tree': 'holidaytree',
        'epaper m29': 'epaper-m29',
        'epaper m42': 'epaper-m42',
        'hdmi': 'hdmi',
        'lcd 16x2': 'lcd-xxxx-char',
        'lcd 20x4': 'lcd-xxxx-char', 
        'oled 096': 'oled-96',
        'portal cp70': 'portal-cp70',
        'tft cp23': 'tft-cp23',
        'tft n18': 'tft-n18',
        'tft r128': 'tft-r128',
        'tft t32': 'tft-t32',
        'vfd b8': 'vfd-b8',
        'button ar100': 'btn-ar100',
        'btn rgb28x4': 'btn-ar28x4',
        'button l': 'button-l',
        'button l7': 'button-l7',
        'button s': 'button-s',
        'dial': 'dial',
        'dipswitch': 'dipswitch',
        'fingerprint': 'fingerprint',
        'joystick l': 'joystick-l',
        'keypad 3x4': 'keypad-3x4',
        'keypad 4x4': 'keypad-4x4',
        'rotary': 'rotary',
        'led mt1208': 'led-mt1208',
        'led r16': 'led-r16',
        'led rgb3': 'led-rgb3',
        'led s284': 'led-s284',
        'led s404': 'led-s404', 
        'led s564': 'led-s564',
        'led ss805': 'led-ss805',
        'smart led': 'smart-led',
        'fan': 'fan',
        'load': 'load',
        'motomax': 'motomax',
        'mototwin': 'mototwin',
        'relay p16': 'relay-p16',
        'relay p4': 'relay-p4',
        'relay x1': 'relay-x1',
        'servo p8': 'servo-p8',
        'servo x1': 'servo-x1',
        'steppulse': 'step-pulse',
        'stepdrive p1': 'stepdrive-p1',
        'stepdrive p3': 'stepdrive-p3',
        'can': 'can',
        'dmx': 'dmx',
        'ethernet': 'ethernet',
        'midi': 'midi',
        'rs485': 'rs485',
        'serial usb': 'serial-usb',
        'usb host': 'usb-host',
        'usb client': 'usb-client',
        'accel': 'accel',
        'airquality': 'airquality',
        'barometer': 'barometer',
        'clipsense': 'clipsense',
        'current': 'current',
        'distance': 'distance',
        'dof9': 'dof9',
        'ekg': 'ekg',
        'gas': 'gas',
        'light': 'light',
        'motion': 'motion',
        'pressure': 'pressure',
        'rtc': 'rtc',
        'temphmd': 'temphmd',
        'temprtd': 'temprtd',
        'buzzer': 'buzzer',
        'mp3': 'mp3',
        'radio fm': 'radio-fm',
        'spectrum': 'spectrum',
        'flash': 'flash',
        'sd card': 'sdcard',
        'microsd': 'microsd',
        'gnss wa': 'gnss-wa',
        'gnss': 'gnss',
        'infrared': 'infrared',
        'nrf24 max': 'nrf24-max',
        'nrf24 min': 'nrf24-min',
        'rfid': 'rfid',
        'barcode l1d2d': 'barcode-l1d2d',
        'thermal': 'thermal',
        'dio x12': 'dio-x12',
        'dueclick': 'dueclick',
        'duepi': 'duepi',
        'duepico': 'duepico'
    }
    
    return mappings.get(name, name)

def get_driver_files():
    """Get all driver files and extract their names"""
    driver_dir = Path('static/code/drivers')
    driver_files = {}
    
    for file_path in driver_dir.rglob('*.due'):
        # Extract category and filename
        relative_path = file_path.relative_to(driver_dir)
        category = relative_path.parts[0]
        filename = file_path.stem
        
        driver_files[filename] = {
            'path': str(file_path),
            'category': category,
            'filename': filename
        }
    
    return driver_files

def analyze_products():
    """Analyze products and their driver table status"""
    
    # Load duelink.json
    with open('static/duelink.json', 'r') as f:
        data = json.load(f)
    
    products = data['products']
    driver_files = get_driver_files()
    
    results = {
        'with_tables': [],
        'missing_tables': [],
        'no_driver_file': [],
        'driver_files_without_products': []
    }
    
    # Analyze each product
    for product in products:
        name = product['name']
        category = product['category']
        normalized_name = normalize_name(name)
        has_driver_table = 'driverTable' in product
        
        # Check if driver file exists
        driver_file_info = None
        for filename, info in driver_files.items():
            if filename == normalized_name:
                driver_file_info = info
                break
        
        product_info = {
            'name': name,
            'category': category,
            'normalized_name': normalized_name,
            'part_number': product.get('partNumber', ''),
            'driver_file': driver_file_info
        }
        
        if driver_file_info:
            if has_driver_table:
                results['with_tables'].append(product_info)
            else:
                results['missing_tables'].append(product_info)
        else:
            results['no_driver_file'].append(product_info)
    
    # Find driver files without corresponding products
    product_names = {normalize_name(p['name']) for p in products}
    for filename, info in driver_files.items():
        if filename not in product_names:
            results['driver_files_without_products'].append(info)
    
    return results

def print_results(results):
    """Print formatted results"""
    
    print("=" * 80)
    print("DUELINK DRIVER TABLE ANALYSIS")
    print("=" * 80)
    
    print(f"\n📊 SUMMARY:")
    print(f"Products with driver tables: {len(results['with_tables'])}")
    print(f"Products missing driver tables: {len(results['missing_tables'])}")
    print(f"Products without driver files: {len(results['no_driver_file'])}")
    print(f"Driver files without products: {len(results['driver_files_without_products'])}")
    
    # Products missing driver tables (highest priority)
    if results['missing_tables']:
        print(f"\n🚨 PRODUCTS MISSING DRIVER TABLES ({len(results['missing_tables'])} total):")
        print("These products have driver files but are missing driverTable fields")
        print("-" * 80)
        
        by_category = {}
        for product in results['missing_tables']:
            category = product['category']
            if category not in by_category:
                by_category[category] = []
            by_category[category].append(product)
        
        for category in sorted(by_category.keys()):
            print(f"\n{category.upper()}:")
            for product in by_category[category]:
                print(f"  • {product['name']}")
                print(f"    Part Number: {product['part_number']}")
                print(f"    Driver File: {product['driver_file']['path']}")
                print(f"    Expected URL: /docs/{product['driver_file']['category']}/{product['normalized_name']}")
                print()
    
    # Products with driver tables (for reference)
    if results['with_tables']:
        print(f"\n✅ PRODUCTS WITH DRIVER TABLES ({len(results['with_tables'])} total):")
        print("These products already have driver tables")
        print("-" * 80)
        
        by_category = {}
        for product in results['with_tables']:
            category = product['category']
            if category not in by_category:
                by_category[category] = []
            by_category[category].append(product)
        
        for category in sorted(by_category.keys()):
            print(f"\n{category.upper()}:")
            for product in by_category[category]:
                print(f"  • {product['name']} ({product['part_number']})")
    
    # Products without driver files
    if results['no_driver_file']:
        print(f"\n❌ PRODUCTS WITHOUT DRIVER FILES ({len(results['no_driver_file'])} total):")
        print("These products don't have corresponding .due files")
        print("-" * 80)
        
        by_category = {}
        for product in results['no_driver_file']:
            category = product['category']
            if category not in by_category:
                by_category[category] = []
            by_category[category].append(product)
        
        for category in sorted(by_category.keys()):
            print(f"\n{category.upper()}:")
            for product in by_category[category]:
                print(f"  • {product['name']} ({product['part_number']})")
                print(f"    Looked for: {product['normalized_name']}.due")
    
    # Driver files without products
    if results['driver_files_without_products']:
        print(f"\n🔍 DRIVER FILES WITHOUT PRODUCTS ({len(results['driver_files_without_products'])} total):")
        print("These .due files don't have corresponding products in duelink.json")
        print("-" * 80)
        
        by_category = {}
        for driver in results['driver_files_without_products']:
            category = driver['category']
            if category not in by_category:
                by_category[category] = []
            by_category[category].append(driver)
        
        for category in sorted(by_category.keys()):
            print(f"\n{category.upper()}:")
            for driver in by_category[category]:
                print(f"  • {driver['filename']}.due")
                print(f"    Path: {driver['path']}")

if __name__ == '__main__':
    results = analyze_products()
    print_results(results)