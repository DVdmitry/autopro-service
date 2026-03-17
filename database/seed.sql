-- AutoPro Service — Seed Data

-- ═══ MECHANICS ═══
INSERT INTO mechanics (id, name, specialization, experience, rating, review_count, avatar, bio) VALUES
('mech_1', 'Krzysztof Nowak', 'engine', 18, 4.9, 234, 'https://randomuser.me/api/portraits/men/32.jpg', 'Master engine technician. Specializes in German and Japanese engines. ASE certified.'),
('mech_2', 'Piotr Wiśniewski', 'brakes', 12, 4.8, 189, 'https://randomuser.me/api/portraits/men/44.jpg', 'Brake and suspension expert. Factory-trained for BMW, Audi, and Mercedes.'),
('mech_3', 'Andrzej Kowalczyk', 'electrical', 15, 4.9, 201, 'https://randomuser.me/api/portraits/men/56.jpg', 'Electrical diagnostics specialist. Expert in CAN-bus systems and hybrid vehicles.'),
('mech_4', 'Tomasz Zieliński', 'tires', 8, 4.7, 156, 'https://randomuser.me/api/portraits/men/22.jpg', 'Tire and alignment specialist. Hunter alignment equipment certified.'),
('mech_5', 'Marcin Szymański', 'bodywork', 20, 4.9, 267, 'https://randomuser.me/api/portraits/men/65.jpg', 'Master body repair technician. 20 years of paintless dent repair experience.'),
('mech_6', 'Jakub Woźniak', 'transmission', 10, 4.6, 134, 'https://randomuser.me/api/portraits/men/28.jpg', 'Transmission specialist. Manual and automatic. DSG/S-tronic certified.'),
('mech_7', 'Adam Kamiński', 'maintenance', 6, 4.7, 98, 'https://randomuser.me/api/portraits/men/38.jpg', 'General maintenance and inspections. Fast turnaround, reliable service.'),
('mech_8', 'Robert Lewandowski', 'detailing', 9, 4.8, 178, 'https://randomuser.me/api/portraits/men/48.jpg', 'Professional detailing and AC service. Ceramic coating certified.');

-- ═══ SERVICES ═══
INSERT INTO services (id, category, name, description, base_price, duration_minutes, icon) VALUES
('svc_oil_standard', 'maintenance', 'Oil Change & Filter', 'Standard oil change with filter replacement and fluid top-up', 80.00, 60, '🛢️'),
('svc_oil_full', 'maintenance', 'Full Synthetic Oil Change', 'Premium synthetic oil with OEM filter and full fluid check', 120.00, 60, '🛢️'),
('svc_brake_pads', 'brakes', 'Brake Pad Replacement', 'Front or rear brake pad replacement with inspection', 150.00, 120, '🔧'),
('svc_brake_full', 'brakes', 'Brake Disc + Pad Replacement', 'Complete brake overhaul — discs and pads per axle', 300.00, 180, '🔧'),
('svc_tire_swap', 'tires', 'Seasonal Tire Change', 'Swap 4 tires, balance, pressure check, visual inspection', 50.00, 45, '🔘'),
('svc_alignment', 'tires', 'Wheel Alignment', '4-wheel laser alignment with printout', 80.00, 60, '🔘'),
('svc_diag', 'engine', 'Engine Diagnostics', 'Full OBD2 scan, error codes, performance analysis', 60.00, 45, '🔍'),
('svc_timing', 'engine', 'Timing Belt Replacement', 'Timing belt + water pump + tensioner replacement', 500.00, 300, '⚙️'),
('svc_ac', 'maintenance', 'AC Service & Recharge', 'AC system check, refrigerant recharge, leak test', 90.00, 60, '❄️'),
('svc_battery', 'electrical', 'Battery Replacement', 'Battery test, replacement, terminal cleaning', 120.00, 30, '⚡'),
('svc_suspension', 'suspension', 'Suspension Check & Repair', 'Full suspension inspection, shock/strut replacement', 200.00, 120, '🔩'),
('svc_trans', 'transmission', 'Transmission Fluid Change', 'ATF/DSG fluid drain and fill with filter', 180.00, 90, '🔄'),
('svc_detail', 'detailing', 'Full Body Detailing', 'Interior deep clean, exterior polish, wax protection', 200.00, 240, '✨'),
('svc_dent', 'bodywork', 'Dent Removal / PDR', 'Paintless dent repair for minor dents and dings', 150.00, 120, '🔨'),
('svc_inspect', 'maintenance', 'Full Vehicle Inspection', 'Complete 50-point safety and condition check', 100.00, 90, '📋');

-- ═══ SERVICE OPTIONS (enrichment) ═══

-- Oil options
INSERT INTO service_options (id, service_id, name, brand, tier, price, description, compatible_makes) VALUES
('opt_oil_castrol', 'svc_oil_standard', 'Castrol Edge 5W-30 LL', 'Castrol', 'standard', 25.00, 'Long-life synthetic. VW 504/507 approved.', '{}'),
('opt_oil_mobil', 'svc_oil_standard', 'Mobil 1 ESP 5W-30', 'Mobil', 'premium', 35.00, 'Full synthetic. BMW LL-04, MB 229.51 approved.', '{}'),
('opt_oil_motul', 'svc_oil_standard', 'Motul 8100 X-Clean 5W-30', 'Motul', 'premium', 40.00, 'Racing-grade synthetic. Universal compatibility.', '{}'),
('opt_oil_oem_vw', 'svc_oil_standard', 'VW Original LongLife III', 'Volkswagen', 'premium', 45.00, 'Factory original oil for VW Group vehicles.', '{"Volkswagen","Audi","Skoda","SEAT"}'),
('opt_oil_oem_bmw', 'svc_oil_standard', 'BMW TwinPower Turbo LL-04', 'BMW', 'premium', 48.00, 'Factory original oil for BMW engines.', '{"BMW","MINI"}'),
('opt_oil_budget', 'svc_oil_standard', 'Total Quartz 9000 5W-40', 'Total', 'budget', 18.00, 'Quality synthetic at value price. ACEA A3/B4.', '{}');

-- Full synthetic oil options (same service, higher base)
INSERT INTO service_options (id, service_id, name, brand, tier, price, description, compatible_makes) VALUES
('opt_foil_castrol', 'svc_oil_full', 'Castrol Edge Titanium 0W-40', 'Castrol', 'standard', 38.00, 'Titanium-reinforced for maximum protection.', '{}'),
('opt_foil_mobil', 'svc_oil_full', 'Mobil 1 FS 0W-40', 'Mobil', 'premium', 45.00, 'Top-tier full synthetic. All approvals.', '{}'),
('opt_foil_motul', 'svc_oil_full', 'Motul 300V Power Racing 5W-30', 'Motul', 'premium', 55.00, 'Ester-based racing oil. Maximum performance.', '{}');

-- Brake pad options
INSERT INTO service_options (id, service_id, name, brand, tier, price, description, compatible_makes) VALUES
('opt_brake_trw', 'svc_brake_pads', 'TRW Cotec', 'TRW', 'budget', 40.00, 'Reliable aftermarket pads. Good daily driver choice.', '{}'),
('opt_brake_ate', 'svc_brake_pads', 'ATE Ceramic', 'ATE', 'standard', 70.00, 'Low-dust ceramic pads. OEM equivalent quality.', '{}'),
('opt_brake_brembo', 'svc_brake_pads', 'Brembo Premium Ceramic', 'Brembo', 'premium', 120.00, 'Performance ceramic pads. Excellent feel and longevity.', '{}'),
('opt_brake_ebc', 'svc_brake_pads', 'EBC Redstuff', 'EBC', 'premium', 95.00, 'Sport compound for spirited driving. Low fade.', '{}');

-- Brake disc + pad combo options
INSERT INTO service_options (id, service_id, name, brand, tier, price, description, compatible_makes) VALUES
('opt_bfull_budget', 'svc_brake_full', 'TRW Discs + Pads Kit', 'TRW', 'budget', 90.00, 'Complete budget-friendly brake kit per axle.', '{}'),
('opt_bfull_oem', 'svc_brake_full', 'ATE PowerDisc + Ceramic Kit', 'ATE', 'standard', 160.00, 'OEM equivalent discs with ceramic pads.', '{}'),
('opt_bfull_brembo', 'svc_brake_full', 'Brembo Xtra + Premium Kit', 'Brembo', 'premium', 250.00, 'Drilled discs + premium ceramic pads.', '{}');

-- Battery options
INSERT INTO service_options (id, service_id, name, brand, tier, price, description, compatible_makes) VALUES
('opt_bat_varta_b', 'svc_battery', 'Varta Blue Dynamic 60Ah', 'Varta', 'budget', 90.00, 'Standard battery for most passenger cars.', '{}'),
('opt_bat_bosch', 'svc_battery', 'Bosch S5 77Ah', 'Bosch', 'standard', 130.00, 'Higher capacity. Good for cars with many electronics.', '{}'),
('opt_bat_varta_agm', 'svc_battery', 'Varta Silver Dynamic AGM 80Ah', 'Varta', 'premium', 195.00, 'Required for Start-Stop vehicles. Premium AGM technology.', '{}');

-- AC recharge options
INSERT INTO service_options (id, service_id, name, brand, tier, price, description, compatible_makes) VALUES
('opt_ac_r134', 'svc_ac', 'R134a Refrigerant Recharge', 'Standard', 'standard', 0.00, 'Standard refrigerant for cars made before 2017.', '{}'),
('opt_ac_r1234', 'svc_ac', 'R1234yf Refrigerant Recharge', 'Standard', 'premium', 40.00, 'New-gen refrigerant for 2017+ vehicles. EU mandated.', '{}');

-- ═══ MECHANIC ↔ SERVICE MAPPINGS ═══
INSERT INTO mechanic_services (mechanic_id, service_id) VALUES
-- Krzysztof Nowak (engine)
('mech_1', 'svc_oil_standard'), ('mech_1', 'svc_oil_full'), ('mech_1', 'svc_diag'), ('mech_1', 'svc_timing'), ('mech_1', 'svc_inspect'),
-- Piotr Wiśniewski (brakes)
('mech_2', 'svc_brake_pads'), ('mech_2', 'svc_brake_full'), ('mech_2', 'svc_suspension'), ('mech_2', 'svc_inspect'),
-- Andrzej Kowalczyk (electrical)
('mech_3', 'svc_battery'), ('mech_3', 'svc_diag'), ('mech_3', 'svc_ac'), ('mech_3', 'svc_inspect'),
-- Tomasz Zieliński (tires)
('mech_4', 'svc_tire_swap'), ('mech_4', 'svc_alignment'), ('mech_4', 'svc_inspect'),
-- Marcin Szymański (bodywork)
('mech_5', 'svc_dent'), ('mech_5', 'svc_detail'),
-- Jakub Woźniak (transmission)
('mech_6', 'svc_trans'), ('mech_6', 'svc_oil_standard'), ('mech_6', 'svc_oil_full'),
-- Adam Kamiński (maintenance)
('mech_7', 'svc_oil_standard'), ('mech_7', 'svc_oil_full'), ('mech_7', 'svc_ac'), ('mech_7', 'svc_tire_swap'), ('mech_7', 'svc_inspect'),
-- Robert Lewandowski (detailing)
('mech_8', 'svc_detail'), ('mech_8', 'svc_ac');

-- ═══ SCHEDULES (Mon-Fri 8:00-18:00, Sat 9:00-14:00) ═══
DO $$
DECLARE
  m RECORD;
  d INTEGER;
BEGIN
  FOR m IN SELECT id FROM mechanics LOOP
    -- Monday to Friday
    FOR d IN 1..5 LOOP
      INSERT INTO schedules (mechanic_id, day_of_week, start_time, end_time, is_working)
      VALUES (m.id, d, '08:00', '18:00', true);

      INSERT INTO schedule_breaks (mechanic_id, day_of_week, start_time, end_time)
      VALUES (m.id, d, '12:00', '12:30');
    END LOOP;

    -- Saturday
    INSERT INTO schedules (mechanic_id, day_of_week, start_time, end_time, is_working)
    VALUES (m.id, 6, '09:00', '14:00', true);

    -- Sunday — closed
    INSERT INTO schedules (mechanic_id, day_of_week, start_time, end_time, is_working)
    VALUES (m.id, 0, '00:00', '00:00', false);
  END LOOP;
END $$;
